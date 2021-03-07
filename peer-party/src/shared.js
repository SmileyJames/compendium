const getMoves = ({ connectionId, roomId, game }) => (
  connectionId === roomId ? game.hostMoves : game.guestMoves
);

const getMoveFunction = ({ connectionId, roomId, game, move }) => (
  getMoves({ connectionId, roomId, game })[move]
)

export const constructReducer = ({ game, events, roomId }) => (state) => {
  try {
    return events.reduce(
      (o, event) => {
        const moveFn = getMoveFunction({ connectionId: event.connectionId, roomId, game, move: event.move })
        return moveFn({ state: o, connectionId: event.connectionId, args: event.args });
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
