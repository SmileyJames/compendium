import { RandomNumberGenerator, Move, RandomMove, RandomSecretMove } from '.'
import { Seed } from './types'

/**
 * A higher order function to provide `random`, a random number generator, to a move defintion.
 * ```js
 * withRandom(({ random, state }) => {
 *   const isHeads = random() > 0.5;
 *   return ({ ...state, isHeads })
 * })
 * ```
 * @param moveFn A game move definition, which will require randomness
 * @return A random move definition
 */
export function withRandom(moveFn: Move): RandomMove | RandomSecretMove {
  moveFn._isRandom = true
  return moveFn as RandomMove | RandomSecretMove
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
