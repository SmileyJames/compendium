import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { getMove, constructMoves } from '../shared'
import { logSizeToIndex, constructReducer } from './funcs'
import { isRandomMove } from '../random'
import { isSecretMove } from '../secret'
import { Moves, PeerId, Game, Args, ConnectionStatus } from '..'
import { LogSize, Emit } from '../types'
import { CacheAndStateSetter, DataConnectionRef } from '.'

const emit = ({ conn, emit }: { emit: Emit; conn: DataConnectionRef }) => {
  console.info('EMIT', emit)
  conn.current?.send(emit)
}

type PreemptArgs = {
  game: Game
  setState: CacheAndStateSetter
  move: string
  args: Args
  connectionId: PeerId
  roomId: PeerId
}
const preempt = ({
  setState,
  game,
  move,
  args,
  connectionId,
  roomId
}: PreemptArgs) => {
  const reducer = constructReducer({
    game,
    roomId,
    events: [{ index: null, move, args, connectionId }]
  })
  setState(({ state, cache }) => ({
    cache: reducer(cache),
    state
  }))
}

type ConstructMovesHandlerArgs = {
  conn: DataConnectionRef
  connectionId: PeerId
  logSize: LogSize
  roomId: PeerId
  game: Game
  setState: CacheAndStateSetter
  setMoves: Dispatch<SetStateAction<Moves | null>>
}
function constructMovesHandler({
  conn,
  connectionId,
  setMoves,
  setState,
  game,
  logSize,
  roomId
}: ConstructMovesHandlerArgs): void {
  const handleMove = ({ move, args }: { move: string; args: Args }) => {
    const moveFn = getMove({ connectionId, roomId, game, move })
    if (!isRandomMove(moveFn) && !isSecretMove(moveFn)) {
      preempt({ setState, game, move, args, roomId, connectionId })
    }
    const index = logSizeToIndex(logSize)
    emit({ conn, emit: { move, args, index } })
  }
  setMoves(() => constructMoves({ game, connectionId, roomId, handleMove }))
}

type UseMovesArgs = {
  connected: ConnectionStatus
  conn: DataConnectionRef
  id: PeerId
  setState: CacheAndStateSetter
  roomId: PeerId
  game: Game
  logSize: LogSize
}
type UseMovesReturn = { moves: Moves | null }
function useMoves({
  connected,
  conn,
  id,
  setState,
  roomId,
  game,
  logSize
}: UseMovesArgs): UseMovesReturn {
  const [moves, setMoves] = useState<Moves | null>(null)
  useEffect(() => {
    if (!connected) return
    constructMovesHandler({
      conn,
      connectionId: id,
      setMoves,
      setState,
      roomId,
      game,
      logSize
    })
  }, [connected, conn, id, setMoves, setState, roomId, game, logSize])
  return { moves }
}

export default useMoves
