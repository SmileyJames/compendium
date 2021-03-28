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
  const words = randomWords({ exactly: 3 }).sort();
  const orderedWords = order.map(o => words[o])
  const roomId = orderedWords.join('-')
  return roomId
}

export const decodeCompendiumIndex = (roomId) => {
  const words = roomId.split('-')
  const sortedWords = [...words].sort()
  const permutation = words.map(word => sortedWords.findIndex((w) => word === w))
  const compendiumIndex = permutations.findIndex((permu) => isEqual(permu, permutation))
  return compendiumIndex;
}
