export const NOUGHTS = 1;
export const CROSSES = 2;

const startGame = ({ state, callerId, args }) => ({
  crossesPlayer: args.crossesConnId,
  noughtsPlayer: args.noughtsConnId,
  board: Array(9).fill(null),
});

const fillSquare = ({ state, callerId, args }) => {
  let player = null
  if (callerId === state.crossesPlayer) {
    player = CROSSES;
  } else if (callerId === state.noughtsPlayer) {
    player = NOUGHTS;
  } else {
    throw new Error('Connection is not a player');
  }

  if (state.board[args.position] !== null) {
    throw new Error('Position filled');
  }

  const board = [...state.board];
  board.splice(args.position, 1, player);

  return ({
    ...state,
    board,
  })
}

const TicTacToe = {
  fillSquare,
  startGame,
}

export default TicTacToe;
