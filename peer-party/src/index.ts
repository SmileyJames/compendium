import usePartyHost from "./host";
import usePartyGuest from "./guest";
import { withRandom } from "./random";
import { DataConnection } from "peerjs";

export type ConnectionStatus = boolean;
export type Connection = DataConnection;
export type ConnectionList = DataConnection[];

export type PeerId = string;
export type Secret = string;
export type Args = any;
export type State = any;
export type Index = number | null;
export type LogSize = number;
export type Seed = string;
export type Patch = any;

export interface Ack { index: Index };
export interface Emit { index: Index, move: string, args: Args };
export interface EventItem {
  index: Index,
  connectionId: PeerId,
  move: string,
  args?: any,
  seed?: Seed,
  patch?: Patch,
};
export type EventList = EventItem[];

export interface SimpleMoveArgs { state: State, args: Args, connectionId: PeerId, roomId: PeerId };

export type RandomNumberGenerator = () => number;
export interface RandomArgsMixin { random: RandomNumberGenerator };
export interface RandomMoveArgs extends SimpleMoveArgs, RandomArgsMixin {};

export type RevealSecretFunction = (contextId: PeerId, extractionFunction: ((state: State) => State)) => any;
export interface SecretArgsMixin { contextId: PeerId, revealSecret: RevealSecretFunction };
export interface SecretMoveArgs extends SimpleMoveArgs, SecretArgsMixin {};

export interface RandomSecretMoveArgs extends SimpleMoveArgs, SecretArgsMixin, RandomArgsMixin {};

export type SimpleMove = {
    _isSecret?: false;
    _isRandom?: false;
    (args: SimpleMoveArgs): State;
};
export type SecretMove = {
    _isSecret: true;
    _isRandom?: false;
    (args: SecretMoveArgs): State;
};
export type RandomMove = {
    _isSecret?: false,
    _isRandom: true;
    (args: RandomMoveArgs): State;
};
export type RandomSecretMove = {
    _isSecret: true;
    _isRandom: true;
    (args: RandomSecretMoveArgs): State;
}
export type Move = SimpleMove | SecretMove | RandomMove | RandomSecretMove;

export type Moves = { [key: string]: Move };
export type Game = {
    hostMoves: Moves,
    guestMoves: Moves,
};

export type MoveHandlerArgs = { move: string, args: Args };
export type MoveHandler = (args: MoveHandlerArgs) => void;
export type MoveHandlerSetter = () => MoveHandler;

export { usePartyHost, usePartyGuest, withRandom }
