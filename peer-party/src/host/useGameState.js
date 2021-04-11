import { useCallback, useMemo } from "react";
import { diff } from "jsondiffpatch";
import seedrandom from "seedrandom";
import { useStatesStore } from "./stores";
import { isRandomMove, genSeed } from "../random";
import { getMove } from "../shared";
import { isSecretMove } from "../secret";

const reducer = ({ state, contextId, connectionId, roomId, random, game, move, args, revealSecret }) => {
  const moveFn = getMove({ connectionId, roomId, game, move })
  let event = { connectionId, move, args };
  let opts = { state, roomId, connectionId, args };

  if (isRandomMove(moveFn)) {
    event.seed = genSeed(random);
    opts.random = seedrandom(event.seed);
  }

  if (isSecretMove(moveFn)) {
    opts.contextId = contextId;
    opts.revealSecret = revealSecret;
  }

  const newState = moveFn(opts);

  if (isSecretMove(moveFn)) {
    event.patch = diff(state, newState);
  }

  return { state: newState, event };
}

const useGameState = ({ roomId, game, random, connectionIds, logEvent }) => {
  const { states, setStates } = useStatesStore(roomId);
  const hostState = useMemo(() => (states[roomId] || {}), [roomId, states[roomId]])
  const input = useCallback(({ connectionId, move, args }) => {
    if (connectionIds == null);
    const revealSecret = (id, fn) => fn(states[id]);
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
  }, [connectionIds, states, roomId, game, random]);

  return { state: hostState, input };
}

export default useGameState
