/* eslint-disable standard/no-callback-literal */
import PeerJS from 'peerjs'
import { renderHook, act } from '@testing-library/react-hooks'
import usePartyHost from './usePartyHost'
import { withRandom, shuffle } from '../random'
import { withSecret } from '../secret'

jest.useFakeTimers()
jest.mock('peerjs')

let mockReceiveEmit
const mockSendSync = jest.fn()
PeerJS.mockImplementation(() => ({
  on: (eventName, callback) => {
    if (eventName === 'connection') {
      callback({
        peer: 'hello',
        on: (_eventName, _callback) => {
          if (_eventName === 'data') {
            mockReceiveEmit = _callback
          } else if (_eventName === 'open') {
            _callback()
          }
        },
        send: mockSendSync
      })
    } else if (eventName === 'open') {
      callback()
    }
  },
  id: 'room-id',
  destroy: () => {}
}))

const start = jest.fn(() => ({
  number: 0,
  connections: ['hello'],
  deck: [1, 2, 3]
}))
const increment = jest.fn(({ args, state: { number } }) => ({
  number: number + ((args && args.value) || 1)
}))
const flipCoin = withRandom(
  jest.fn(({ state, random }) => ({
    ...state,
    flipped: random() > 0.5
  }))
)

const dealCards = withRandom(
  withSecret(
    jest.fn(({ state, random, contextId }) => {
      const deck = shuffle({ random, array: state.deck })
      const playerIndex = state.connections.findIndex(
        (conn) => conn === contextId
      )
      const hand = deck.filter(() => playerIndex === 0)
      return { ...state, deck: [], hand }
    })
  )
)

const revealACard = withSecret(
  jest.fn(({ state, connectionId, contextId, revealSecret }) => {
    const newState = { ...state }
    const firstCard = revealSecret(connectionId, (state) => state.hand[0])
    if (connectionId === contextId) {
      const newHand = state.hand.slice(1)
      newState.hand = newHand
    }
    newState.revealedCard = firstCard
    return newState
  })
)

const game = {
  guestMoves: {
    revealACard,
    increment,
    flipCoin
  },
  hostMoves: {
    dealCards,
    start,
    increment
  }
}

describe('usePartyHost', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('The host can call moves locally and maintains a local state', () => {
    const { unmount, result } = renderHook(() =>
      usePartyHost({ roomId: 'room-id', game })
    )

    expect(result.current.state).toBeTruthy()
    expect(result.current.moves).toBeTruthy()

    act(() => {
      result.current.moves.start()
    })

    expect(start).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: 'room-id',
      roomId: 'room-id',
      state: {}
    })
    expect(result.current.state.number).toBe(0)
    expect(mockSendSync).toHaveBeenCalledWith([
      { index: 0, args: undefined, connectionId: 'room-id', move: 'start' }
    ])

    act(() => {
      result.current.moves.increment()
    })

    expect(increment).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: 'room-id',
      roomId: 'room-id',
      state: {
        number: 0,
        connections: ['hello'],
        deck: [1, 2, 3]
      }
    })
    expect(result.current.state.number).toBe(1)
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 0, args: undefined, connectionId: 'room-id', move: 'start' },
      { index: 1, args: undefined, connectionId: 'room-id', move: 'increment' }
    ])

    act(() => {
      mockReceiveEmit({
        index: 1
      })
    })

    expect(mockSendSync).toHaveBeenCalledTimes(2)

    act(() => {
      result.current.moves.increment()
    })

    expect(increment).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: 'room-id',
      roomId: 'room-id',
      state: {
        number: 1
      }
    })
    expect(result.current.state.number).toBe(2)
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: 'room-id', move: 'increment' }
    ])

    act(() => {
      mockReceiveEmit({
        index: 1,
        move: 'increment',
        args: { value: 2 }
      })
    })

    expect(increment).toHaveBeenLastCalledWith({
      args: { value: 2 },
      connectionId: 'hello',
      roomId: 'room-id',
      state: {
        number: 2
      }
    })
    expect(result.current.state.number).toBe(4)
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: 'room-id', move: 'increment' },
      { index: 3, args: { value: 2 }, connectionId: 'hello', move: 'increment' }
    ])

    act(() => {
      mockReceiveEmit({
        index: 3,
        move: 'flipCoin',
        args: {}
      })
    })

    expect(result.current.state.flipped).toBe(false)
    expect(mockSendSync).toHaveBeenCalled()

    unmount()
  })

  test(
    'The host shares the results of secret moves with guests and maintains' +
      "a copy of everyone's state for validation and to create patches from the diff.",
    () => {
      const { result } = renderHook(() =>
        usePartyHost({ roomId: 'room-id', game })
      )

      expect(result.current.state).toBeTruthy()
      expect(result.current.moves).toBeTruthy()

      act(() => {
        result.current.moves.start()
      })

      expect(result.current.state.connections).toStrictEqual(['hello'])

      act(() => {
        result.current.moves.dealCards()
      })

      expect(result.current.state).toStrictEqual({
        connections: ['hello'],
        deck: [],
        hand: [],
        number: 0
      })

      expect(mockSendSync).toHaveBeenLastCalledWith([
        { index: 0, args: undefined, connectionId: 'room-id', move: 'start' },
        {
          index: 1,
          args: undefined,
          connectionId: 'room-id',
          move: 'dealCards',
          patch: {
            deck: { _0: [1, 0, 0], _1: [2, 0, 0], _2: [3, 0, 0], _t: 'a' },
            hand: [[2, 1, 3]]
          },
          seed: '0.8619044772223384'
        }
      ])

      act(() => {
        mockReceiveEmit({
          index: 0
        })
        mockReceiveEmit({
          index: 1,
          move: 'revealACard',
          args: {}
        })
      })

      expect(result.current.state).toStrictEqual({
        connections: ['hello'],
        deck: [],
        hand: [],
        number: 0,
        revealedCard: 2
      })

      expect(mockSendSync).toHaveBeenLastCalledWith([
        {
          index: 2,
          args: {},
          connectionId: 'hello',
          move: 'revealACard',
          patch: {
            hand: {
              _0: [2, 0, 0],
              _t: 'a'
            },
            revealedCard: [2]
          }
        }
      ])
    }
  )
})
