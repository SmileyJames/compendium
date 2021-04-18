import { PeerId, Game, Args, MoveHandler, Moves, Move } from ".";

interface GetMovesArgs { connectionId: PeerId, roomId: PeerId, game: Game };

function getMoves ({ connectionId, roomId, game }: GetMovesArgs): Moves {
  return (
    connectionId === roomId ? game.hostMoves : game.guestMoves
  );
};

interface GetMoveArgs extends GetMovesArgs { move: string };

export function getMove({ connectionId, roomId, game, move }: GetMoveArgs): Move {
  return (
    getMoves({ connectionId, roomId, game })[move]
  );
}

interface ConstructMovesArgs extends GetMovesArgs { handleMove: MoveHandler };

export function constructMoves ({ game, connectionId, roomId, handleMove }: ConstructMovesArgs): Moves {
  return new Proxy({}, {
    get: (target, key, receiver) => {
      const moves = getMoves({ connectionId, roomId, game });
      if (moves.hasOwnProperty(key)) {
        return (args: Args) => handleMove({ move: key.toString(), args });
      } else if (key === Symbol.iterator && moves) {
        return Object.keys(moves)[Symbol.iterator].bind(target);
      } else {
        return Reflect.get(target, key, receiver);
      }
    }
  });
}
