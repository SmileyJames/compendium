import PeerJS from 'peerjs'
import { renderHook, act } from '@testing-library/react-hooks'
import usePartyGuest from './usePartyGuest'
import { withRandom, shuffle } from '../random'
import { withSecret, revealSecret } from '../secret'

jest.useFakeTimers()
jest.mock('peerjs')
let mockReceiveSync
const mockSendEmit = jest.fn()

PeerJS.mockImplementation(() => ({
  connect: () => ({
    on: (eventName, callback) => {
      if (eventName === 'data') {
        mockReceiveSync = callback
      } else if (eventName === 'open') {
        callback()
      }
    },
    send: mockSendEmit
  }),
  on: (eventName, callback) => {
    if (eventName === 'open') {
      callback()
    }
  },
  id: 'id',
  destroy: () => {}
}))

const start = jest.fn(() => ({ number: 0 }))
const increment = jest.fn(({ args, state: { number } }) => {
  const increase = args && args.value ? args.value : 1
  const num = number || 0
  const output = { number: num + increase }
  return output
})
const flipCoin = withRandom(
  jest.fn(({ state, random }) => ({
    ...state,
    flipped: random() > 0.5
  }))
)
const dealCards = withSecret(
  jest.fn(({ state, random, contextId }) => {
    const deck = shuffle({ random, array: state.deck })
    const playerIndex = state.connections.findIndex(
      (conn) => conn === contextId
    )
    const hand = deck.filter((_, index) => index % playerIndex === 0)
    return { ...state, deck: [], hand }
  })
)

const revealACard = withSecret(
  jest.fn(({ state, connectionId, contextId }) => {
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
    start,
    increment,
    flipCoin,
    revealACard
  },
  hostMoves: {
    dealCards
  }
}

describe('usePartyGuest', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('State is maintained correctly whilst emitting from guest and syncing from host', () => {
    const { unmount, result } = renderHook(() =>
      usePartyGuest({ id: 'hello', roomId: 'hello-world', game })
    )

    expect(result.current.state).toBeTruthy()
    expect(result.current.moves).toBeTruthy()
    expect(result.current.connectionId.length).toBe(36)

    act(() => {
      result.current.moves.start()
    })

    expect(game.guestMoves.start).toHaveBeenLastCalledWith({
      state: {},
      args: undefined,
      connectionId: result.current.connectionId,
      roomId: 'hello-world'
    })
    expect(result.current.state.number).toBe(0)
    expect(mockSendEmit).toHaveBeenCalledWith({
      args: undefined,
      index: null,
      move: 'start'
    })

    act(() => {
      result.current.moves.increment()
    })

    expect(game.guestMoves.increment).toHaveBeenLastCalledWith({
      state: { number: 0 },
      args: undefined,
      connectionId: result.current.connectionId,
      roomId: 'hello-world'
    })
    expect(result.current.state.number).toBe(1)
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      args: undefined,
      index: null,
      move: 'increment'
    })

    act(() => {
      mockReceiveSync([
        { index: 0, move: 'start' },
        { index: 1, move: 'increment' }
      ])
    })

    expect(result.current.state.number).toBe(1)
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 1
    })

    act(() => {
      mockReceiveSync([
        {
          index: 2,
          connectionId: 'unique-id',
          args: { value: 5 },
          move: 'increment'
        }
      ])
    })

    expect(result.current.state.number).toBe(6)
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 2
    })

    // random move
    act(() => {
      result.current.moves.flipCoin()
    })

    expect(game.guestMoves.flipCoin).not.toHaveBeenCalled()
    // state stays the same
    expect(result.current.state.number).toBe(6)
    expect(result.current.state.flipped).toBe(undefined)
    // emit with secret request
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      args: undefined,
      index: 2,
      move: 'flipCoin'
    })

    // Receive seed for a move with randomness
    act(() => {
      mockReceiveSync([
        {
          index: 3,
          connectionId: 'unique-id',
          seed: 'server_secret_decision',
          args: {},
          move: 'flipCoin'
        }
      ])
    })

    // state is updated using seeded RNG
    expect(result.current.state.number).toBe(6)
    expect(result.current.state.flipped).toBe(true)
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 3
    })

    unmount()
  })

  describe('Secret - Guest', () => {
    // A guest get's their hand when a host deals out the cards
    test("when the host's sync's it's secret move, the guest applies the patch to their state", () => {
      const { result } = renderHook(() =>
        usePartyGuest({ id: 'hello', roomId: 'hello-world', game })
      )

      act(() => {
        mockReceiveSync([
          {
            index: 0,
            move: 'dealCards',
            connectionId: 'hello-world',
            patch: {
              hand: [[1, 2, 3]]
            }
          }
        ])
      })

      expect(result.current.state).toStrictEqual({
        hand: [1, 2, 3]
      })
      expect(dealCards).not.toHaveBeenCalled()
    })

    // A guest can reveal a card from their secret hand
    test("guest makes a secret move and applies a patch (to the guest's state) sent by the host", () => {
      const { result } = renderHook(() =>
        usePartyGuest({ id: 'hello', roomId: 'hello-world', game })
      )

      act(() => {
        result.current.moves.revealACard()
      })

      expect(mockSendEmit).toHaveBeenLastCalledWith({
        args: undefined,
        index: null,
        move: 'revealACard'
      })

      expect(revealACard).not.toHaveBeenCalled()
      expect(result.current.state).toStrictEqual({})

      act(() => {
        mockReceiveSync([
          {
            index: 0,
            move: 'dealCards',
            connectionId: 'hello-world',
            patch: {
              hand: [
                [1, 2, 3],
                [2, 3]
              ],
              revealedCard: [1]
            }
          }
        ])
      })

      expect(revealACard).not.toHaveBeenCalled()
      expect(result.current.state).toStrictEqual({
        hand: [2, 3],
        revealedCard: 1
      })
    })
  })
})
