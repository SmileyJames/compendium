import { useState, useEffect } from "react";
import compendium from "@compendium/compendium";
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

export const createRoomId = (compendiumIndex) => {
  const order = permutations[compendiumIndex]
  const words = randomWords({ exactly: 3 })
  const sortedWords = words.sort()
  const orderedWords = order.map(o => sortedWords[o])
  const roomId =  orderedWords.join(' ')
  return roomId
}

const decodeCompendiumIndex = (roomId) => {
  const words = roomId.split(' ')
  const sortedWords = words.sort()
  const permutation = words.map(word => sortedWords.findIndex(isEqual))
  const compendiumIndex = permutations.findIndex(isEqual)
  return compendiumIndex;
}

const getGame = (roomId) => compendium[decodeCompendiumIndex(roomId)]

export const useGame = (roomId) => {
  const [game, setGame] = useState();
  useEffect(() => setGame(getGame(roomId)), [])
  return game;
}
