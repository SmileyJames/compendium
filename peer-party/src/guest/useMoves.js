import { useEffect, useState } from "react";
import { constructMoves, constructReducer, isSecretMove } from "../shared";
import { logSizeToIndex } from "./funcs";

export const emit = ({ conn, logSize, move, args }) => {
  conn.current.send({ index: logSizeToIndex(logSize), move, args })
}

export const preempt = ({ setState, game, move, args, connectionId, roomId }) => {
  const reducer = constructReducer({ game, roomId, events: [{ move, args, connectionId }] })
  setState(({ state, cache }) => ({
    cache: reducer(state),
    state,
  }));
}

export const constructMovesHandler = ({ conn, connectionId, setMoves, setState, game, logSize, roomId }) => {
  const handleMove = ({ move, args }) => {
    if (!isSecretMove({ connectionId, roomId, game, move })) {
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
