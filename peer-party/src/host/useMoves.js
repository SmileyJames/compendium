import { useEffect, useState } from "react";
import { constructMoves } from "../shared";
import { logEvent } from "./funcs";

const constructMovesHandler = ({ setMoves, game, roomId, setEventLog }) => {
  const handleMove = ({ move, args }) => {
    logEvent({ setEventLog, event: { move, args }, connectionId: roomId })
  };
  setMoves(() => constructMoves({ game, connectionId: roomId, roomId, handleMove }))
}

const useMoves = ({ roomId, game, setEventLog }) => {
  const [moves, setMoves] = useState(null);

  useEffect(() => {
    if (!game) return;
    constructMovesHandler({ setMoves, game, roomId, setEventLog });
  }, [roomId, game, setEventLog]);

  return { moves, setMoves }
}

export default useMoves;
