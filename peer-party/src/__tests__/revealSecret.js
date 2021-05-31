import PeerJS from 'peerjs'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePartyHost, withSecret } from '..'

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

const addWinner = withSecret(({ contextId }) => {
  return { winner: winnerMap[contextId] }
})

const revealHostWinner = withSecret(({ state, revealSecret, roomId }) => {
  const hostWinner = revealSecret('B', (hostState) => hostState.winner)
  return { ...state, hostWinner }
})

const game = { addWinner, revealHostWinner }

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
      result.current.moves.addWinner()
    })

    expect(result.current.state).toStrictEqual({ winner: 0.5 })

    expect(connA.conn.send).toHaveBeenLastCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'addWinner',
        patch: {
          winner: [0.39469349411269494]
        }
      }
    ])

    expect(connB.conn.send).toHaveBeenLastCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'addWinner',
        patch: {
          winner: [1]
        }
      }
    ])

    act(() => {
      result.current.moves.revealHostWinner()
    })

    expect(result.current.state).toStrictEqual({ winner: 0.5, hostWinner: 1 })

    expect(connA.conn.send).toHaveBeenLastCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'addWinner',
        patch: {
          winner: [0.39469349411269494]
        }
      },
      {
        args: undefined,
        connectionId: 'room-id',
        index: 1,
        move: 'revealHostWinner',
        patch: {
          hostWinner: [1]
        }
      }
    ])

    expect(connB.conn.send).toHaveBeenLastCalledWith([
      {
        args: undefined,
        connectionId: 'room-id',
        index: 0,
        move: 'addWinner',
        patch: {
          winner: [1]
        }
      },
      {
        args: undefined,
        connectionId: 'room-id',
        index: 1,
        move: 'revealHostWinner',
        patch: {
          hostWinner: [1]
        }
      }
    ])
  })
})
