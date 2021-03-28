import { useState, useEffect } from "react";
import compendium from "./compendium";
import { decodeCompendiumIndex } from "./rooms";

const getGame = (roomId) => {
  const compendiumIndex = decodeCompendiumIndex(roomId)
  const game = compendium[compendiumIndex];
  return game;
}

const useGame = (roomId) => {
  const [game, setGame] = useState({ name: null, Host: null, Guest: null, game: null });
  useEffect(() => setGame(getGame(roomId)), [])
  return game;
}

export default useGame;
