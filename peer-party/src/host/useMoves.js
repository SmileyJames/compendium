import { useEffect, useState } from "react";
import { constructMoves } from "../shared";
import { logEvent } from "./funcs";

const constructMovesHandler = ({ setMoves, game, roomId, setEventLog, random }) => {
  const handleMove = ({ move, args }) => {
    logEvent({ setEventLog, event: { move, args }, connectionId: roomId, roomId, game, random })
  };
  setMoves(() => constructMoves({ game, connectionId: roomId, roomId, handleMove }))
}

const useMoves = ({ roomId, game, setEventLog, random }) => {
  const [moves, setMoves] = useState(null);

  useEffect(() => {
    if (!game) return;
    constructMovesHandler({ setMoves, game, roomId, setEventLog, random });
  }, [roomId, game, setEventLog]);

  return { moves, setMoves }
}

export default useMoves;
