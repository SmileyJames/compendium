import { RandomNumberGenerator, Move, Seed } from '.'

export const withRandom = (moveFn: Move) => {
  moveFn._isRandom = true
  return moveFn
}

export const isRandomMove = (moveFn: Move) => moveFn._isRandom

export const shuffle = ({
  random = Math.random,
  array
}: {
  random: RandomNumberGenerator
  array: any[]
}) => {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = [...array]
  while (++index < length) {
    const rand = index + Math.floor(random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

export function genSeed(random: RandomNumberGenerator): Seed {
  return random().toString()
}
