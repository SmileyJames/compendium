import { Move, SecretMove, RandomSecretMove } from '.'

/**
 * A higher order function to provide `contextId` and `revealASecret`, enabling the move
 * to return a different state for different peers.
 * ```js
 * withSecret(({ contextId, hostId, revealSecret, state }) => {
 *   const isHostContext = hostId === contextId
 *   if (isHostContext) {
 *     return ({ ...state, deck: state.deck.slice(1) })
 *   } else {
 *     const topCardOfDeck = revealSecret(hostId, s => s.deck[0])
 *     return ({ ...state, revealedCard: topCardOfDeck })
 *   }
 * })
 * ```
 * @param moveFn A move defition that needs to be secretive
 * @return A move defintion with context awareness and access to secret state
 */
export function withSecret(moveFn: Move): SecretMove | RandomSecretMove {
  moveFn._isSecret = true
  return moveFn as SecretMove | RandomSecretMove
}

export const isSecretMove = (moveFn: Move) => moveFn._isSecret
