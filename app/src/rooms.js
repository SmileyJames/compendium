import { useState, useEffect } from "react";
import compendium from "./compendium";
import randomWords from "random-words";
import isEqual from "lodash/isEqual";

const permutations = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [2, 0, 1],
  [2, 1, 0],
  [1, 2, 0],
];

const createConnectionId = () => randomWords({ exactly: 5 }).join('-');

export const useConnectionId = () => {
  const [connectionId, setConnectionId] = useState();
  useEffect(() => {
    setConnectionId(() => createConnectionId())
  }, []);
  return connectionId;
}

export const createRoomId = (compendiumIndex) => {
  const order = permutations[compendiumIndex]
  const words = randomWords({ exactly: 3 })
  const sortedWords = words.sort()
  const orderedWords = order.map(o => sortedWords[o])
  const roomId = orderedWords.join('-')
  return roomId
}

const decodeCompendiumIndex = (roomId) => {
  const words = roomId.split('-')
  const sortedWords = words.sort()
  const permutation = words.map(word => sortedWords.findIndex((w) => word === w))
  const compendiumIndex = permutations.findIndex((permu) => isEqual(permu, permutation))
  return compendiumIndex;
}

const getGame = (roomId) => {
  const compendiumIndex = decodeCompendiumIndex(roomId)
  const game = compendium[compendiumIndex];
  return game;
}

export const useGame = (roomId) => {
  const [game, setGame] = useState({ name: null, Host: null, Guest: null, game: null });
  useEffect(() => setGame(getGame(roomId)), [])
  return game;
}
