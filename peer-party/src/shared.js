import seedrandom from "seedrandom";
import { patch } from "jsondiffpatch";
import { isRandomMove } from "./random";
import { isSecretMove } from "./secret";

const getMoves = ({ connectionId, roomId, game }) => (
  connectionId === roomId ? game.hostMoves : game.guestMoves
);

export const getMove = ({ connectionId, roomId, game, move }) => (
  getMoves({ connectionId, roomId, game })[move]
)

export const constructReducer = ({ game, events, roomId }) => (state) => {
  try {
    return events.reduce(
      (o, event) => {
        const moveFn = getMove({ connectionId: event.connectionId, roomId, game, move: event.move });

        console.log("moveFn", moveFn == null, event.move)
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
}

export const constructMoves = ({ game, connectionId, roomId, handleMove }) => {
  return new Proxy({}, {
    get: (target, key, receiver) => {
      const moves = getMoves({ connectionId, roomId, game });
      if (moves.hasOwnProperty(key)) {
        return (args) => handleMove({ move: key, args });
      } else if (key === Symbol.iterator && moves) {
        return moves.keys().bind(target)[Symbol.iterator]
      } else {
        return Reflect.get(target, key, receiver);
      }
    }
  });
}
