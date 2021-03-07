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

export const constructMoves = ({ game, connectionId, roomId, moves, handleMove }) => {
  moves.current = new Proxy({}, {
    get: (target, key, receiver) => {
      console.log("key", key)
      if (key === Symbol.iterator) {
        const moves = getMoves({ connectionId, roomId, game });
        console.log(",moves", moves);
        return moves && moves.keys().bind(target)[Symbol.iterator]
      } else {
        try {
          getMoveFunction({ connectionId, roomId, game, move: key })
          return (args) => handleMove({ move: key, args });
        } catch (e) {
          return Reflect.get(target, key, receiver);
        }
      }
    }
  });
}
