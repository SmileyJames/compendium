import PeerJS from 'peerjs'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePartyHost, withSecret, withRandom } from '..'

jest.useFakeTimers()
jest.mock('peerjs')

const mockPeerHandlers = {}
PeerJS.mockImplementation(() => ({
  on: (eventName, fn) => {
    mockPeerHandlers[eventName] = jest.fn(fn)
  },
  id: 'room-id',
  destroy: () => {}
}))

const createConnection = (peer) => {
  const mockConnHandlers = {}
  const conn = {
    peer,
    send: jest.fn(),
    on: (eventName, fn) => {
      mockConnHandlers[eventName] = fn
    }
  }
  mockPeerHandlers.connection(conn)
  return { handlers: mockConnHandlers, conn }
}

const winnerMap = {
  A: 0.39469349411269494,
  B: 1,
  'room-id': 0.5
}

const throwPotato = withRandom(
  withSecret(({ state, random, contextId }) => {
    const randNum = random()
    console.log('random', randNum)
    const hotPotato = winnerMap[contextId] === randNum
    return { ...state, hotPotato }
  })
)

const game = { hostMoves: { throwPotato } }

describe('Host multiple guests', () => {
  test('Host a game with a secret random move for two guest connections', () => {
    let connA, connB
    const { result } = renderHook(() =>
      usePartyHost({ roomId: 'room-id', game })
    )

    act(() => {
      connA = createConnection('A')
      connA.handlers.open()
    })

    expect(result.current.state).toStrictEqual({})
    expect(result.current.connections).toStrictEqual(['A'])

    act(() => {
      connB = createConnection('B')
      connB.handlers.open()
    })

    expect(result.current.state).toStrictEqual({})
    expect(result.current.connections).toStrictEqual(['A', 'B'])

    act(() => {
      result.current.moves.throwPotato()
    })

    expect(result.current.state).toStrictEqual({ hotPotato: false })

    expect(connA.conn.send).toHaveBeenCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'throwPotato',
        patch: {
          hotPotato: [true]
        },
        seed: '0.8619044772223384'
      }
    ])

    expect(connB.conn.send).toHaveBeenCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'throwPotato',
        patch: {
          hotPotato: [false]
        },
        seed: '0.8619044772223384'
      }
    ])
  })
})
