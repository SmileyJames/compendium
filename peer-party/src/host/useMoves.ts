import { useState, useMemo, useCallback } from "react";
import { constructMoves } from "../shared";
import { PeerId, Game, Moves } from "..";
import { InputerSetter, Inputer } from ".";

type UseMovesArgs =  { roomId: PeerId, game: Game };

type UseMovesReturn = { moves: Moves, setOnHostEvent: InputerSetter };

function useMoves({ roomId, game }: UseMovesArgs): UseMovesReturn {

  const [onEvent, setOnHostEvent] = useState<Inputer>(() => () => null);

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