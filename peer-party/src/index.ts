import usePartyHost from './host'
import usePartyGuest from './guest'
import { withRandom } from './random'
import { withSecret } from './secret'

export type PeerId = string
export type Args = any
export type State = any
export type Secret = string
export type ConnectionStatus = boolean

export interface SimpleMoveArgs {
  state: State
  args: Args
  connectionId: PeerId
  roomId: PeerId
}

export type RandomNumberGenerator = () => number
export interface RandomArgsMixin {
  random: RandomNumberGenerator
}
export interface RandomMoveArgs extends SimpleMoveArgs, RandomArgsMixin {}

export type RevealSecretFunction = (
  contextId: PeerId,
  extractionFunction: (state: State) => State
) => any
export interface SecretArgsMixin {
  contextId: PeerId
  revealSecret: RevealSecretFunction
}
export interface SecretMoveArgs extends SimpleMoveArgs, SecretArgsMixin {}

export interface RandomSecretMoveArgs
  extends SimpleMoveArgs,
    SecretArgsMixin,
    RandomArgsMixin {}

export type SimpleMove = {
  _isSecret?: false
  _isRandom?: false
  (args: SimpleMoveArgs): State
}
export type SecretMove = {
  _isSecret: true
  _isRandom?: false
  (args: SecretMoveArgs): State
}
export type RandomMove = {
  _isSecret?: false
  _isRandom: true
  (args: RandomMoveArgs): State
}
export type RandomSecretMove = {
  _isSecret: true
  _isRandom: true
  (args: RandomSecretMoveArgs): State
}
export type Move = SimpleMove | SecretMove | RandomMove | RandomSecretMove

export type Moves = { [key: string]: Move }
export type Game = {
  hostMoves: Moves
  guestMoves: Moves
}

export interface UsePartyHostArgs {
  roomId: PeerId
  game: Game
  secret: Secret
}

export interface UsePartyHostReturn {
  state: State
  moves: Moves | null
  connections: PeerId[]
}

export interface UsePartyGuestArgs {
  roomId: PeerId
  game: Game
}

export interface UsePartyGuestReturn {
  connectionId: PeerId
  connected: ConnectionStatus
  state: State
  moves: Moves | null
}

export { usePartyHost, usePartyGuest, withRandom, withSecret }
