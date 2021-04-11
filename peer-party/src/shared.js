const getMoves = ({ connectionId, roomId, game }) => (
  connectionId === roomId ? game.hostMoves : game.guestMoves
);

export const getMove = ({ connectionId, roomId, game, move }) => (
  getMoves({ connectionId, roomId, game })[move]
)

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
