import { useCallback, useMemo } from "react";
import { diff } from "jsondiffpatch";
import seedrandom from "seedrandom";
import { useStatesStore } from "./stores";
import { isRandomMove, genSeed } from "../random";
import { getMove } from "../shared";
import { isSecretMove } from "../secret";
import { State, PeerId, RandomNumberGenerator, Args, RevealSecretFunction, Game, EventItem, RandomMove, SecretMove, SimpleMove, RandomArgsMixin, SecretArgsMixin, RandomSecretMove } from "..";
import { EventLogger } from ".";

type ReducerArgs = { 
  state: State,
  contextId: PeerId,
  connectionId: PeerId,
  roomId: PeerId,
  random: RandomNumberGenerator,
  game: Game,
  move: string,
  args: Args,
  revealSecret: RevealSecretFunction
};

const reducer = ({ state, contextId, connectionId, roomId, random, game, move, args, revealSecret }: ReducerArgs) => {
  
  const moveFn = getMove({ connectionId, roomId, game, move })
  let event: EventItem = { index: null, connectionId, move, args };

  let newState: State;

  const isRandom = isRandomMove(moveFn);
  const isSecret = isSecretMove(moveFn);

  if (isRandom) {
    event.seed = genSeed(random);
  }

  const simpleMoveArgs = { state, roomId, connectionId, args };
  const randomMixin: RandomArgsMixin | null = isRandom ? { random: seedrandom(event.seed) } : null;
  const secretMixin: SecretArgsMixin | null = isSecret ? { contextId, revealSecret } : null;

  if (randomMixin && !isSecret) {
    const randomMoveFn = moveFn as RandomMove;
    newState = randomMoveFn({ ...simpleMoveArgs, ...randomMixin });
    return { state: newState, event };
  }

  if (secretMixin) {
    if (!isRandom) {
      const secretMoveFn = moveFn as SecretMove;
      newState = secretMoveFn({ ...simpleMoveArgs, ...secretMixin });
    }

    if (randomMixin) {
      const randomSecretMoveFn = moveFn as RandomSecretMove;
      newState = randomSecretMoveFn({ ...simpleMoveArgs, ...secretMixin, ...randomMixin })
    }

    event.patch = diff(state, newState);
    return { state: newState, event };
  }

  const simpleMoveFn = moveFn as SimpleMove;
  newState = simpleMoveFn(simpleMoveArgs);
  return { state: newState, event };
}

type UseGameStateArgs = { roomId: PeerId, game: Game, random: RandomNumberGenerator, connectionIds: PeerId[], logEvent: EventLogger }
const useGameState = ({ roomId, game, random , connectionIds, logEvent }: UseGameStateArgs) => {
  const { states, setStates } = useStatesStore(roomId);
  const hostState = useMemo(() => (states[roomId] || {}), [roomId, states])
  const input = useCallback(({ connectionId, move, args }) => {
    if (connectionIds == null) return;
    const revealSecret = (id: PeerId, fn: (s: State) => State) => fn(states[id]);
    setStates((states) => (
      ([...connectionIds, roomId]).reduce((newStates, contextId) => {
        try {
          const { state, event } = reducer({
            state: states[contextId] || {},
            connectionId,
            args,
            move,
            roomId,
            game,
            contextId,
            random,
            revealSecret
          });
          newStates[contextId] = state;
          logEvent({ connectionId: contextId, event });
        } catch (error) {
          console.error("Invalid Event", error);
        } finally {
          return newStates;
        }
      }, {})
    ));
  }, [logEvent, connectionIds, states, roomId, game, random, setStates]);

  return { state: hostState, input };
}

export default useGameState
