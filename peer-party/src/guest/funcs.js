import seedrandom from "seedrandom";
import { patch } from "jsondiffpatch";
import { getMove } from "../shared";
import { isRandomMove } from "../random";
import { isSecretMove } from "../secret";

export const logSizeToIndex = logSize => {
  const index = logSize - 1;
  return (index < 0) ? null : index;
};

export const constructReducer = ({ game, events, roomId }) => (state) => {
  try {
    return events.reduce(
      (o, event) => {
        const moveFn = getMove({ connectionId: event.connectionId, roomId, game, move: event.move });
        const opts = { state: o, roomId, connectionId: event.connectionId, args: event.args };

        if (isRandomMove(moveFn)) {
          if (event.seed == null) {
            throw new Error('Random moves require a seed from the host');
          }
          opts.random = seedrandom(event.seed);
        }
        
        if (isSecretMove(moveFn)) {
          if (event.patch == null) {
            throw new Error('Secret moves require a state patch from the host');
          }
          patch(o, event.patch);
          return o;
        }

        return moveFn(opts);
      },
      state
    );
  } catch (e) {
    console.error(e);
    return state;
  }
};