import { useEffect, useState } from "react";
import { getMove, constructMoves  } from "../shared";
import { logSizeToIndex, constructReducer } from "./funcs";
import { isRandomMove } from "../random";
import { isSecretMove } from "../secret";

export const emit = ({ conn, logSize, move, args }) => {
  conn.current.send({ index: logSizeToIndex(logSize), move, args })
}

export const preempt = ({ setState, game, move, args, connectionId, roomId }) => {
  const reducer = constructReducer({ game, roomId, events: [{ move, args, connectionId }] })
  setState(({ state, cache }) => ({
    cache: reducer(cache),
    state,
  }));
}

export const constructMovesHandler = ({ conn, connectionId, setMoves, setState, game, logSize, roomId }) => {
  const handleMove = ({ move, args }) => {
    const moveFn = getMove({ connectionId, roomId, game, move })
    if (!isRandomMove(moveFn) && !isSecretMove(moveFn)) {
      preempt({ setState, game, move, args, roomId, connectionId })
    }
    emit({ conn, move, args, logSize })
  }
  setMoves(() => constructMoves({ game, connectionId, roomId, handleMove }));
}

const useMoves = ({ connected, conn, id, setState, roomId, game, logSize }) => {
  const [moves, setMoves] = useState(null);
  useEffect(() => {
    if (!connected) return;
    constructMovesHandler({ conn, connectionId: id, setMoves, setState, roomId, game, logSize })
  }, [connected, conn.current, id, setMoves, setState, roomId, game, logSize])
  return { moves };
}

export default useMoves;
