import { useState, useMemo, useCallback } from "react";
import { constructMoves } from "../shared";

const useMoves = ({ roomId, game }) => {
  const [onEvent, setOnHostEvent] = useState(() => {});
  const handleMove = useCallback((event) => {
    onEvent({ ...event, connectionId: roomId })
  }, [roomId, onEvent]);
  const moves = useMemo(() => {
    if (!handleMove || !roomId  || !game) return {};
    return constructMoves({ game, connectionId: roomId, roomId, handleMove });
}, [roomId, game, handleMove]);
  return { moves, setOnHostEvent };
}

export default useMoves;