const NOUGHTS = 1;
const CROSSES = 2;

const startGame = ({ state, connectionId, args }) => ({
  crossesPlayer: args.crossesConnId,
  noughtsPlayer: args.noughtsConnId,
  board: Array(9).fill(null),
});

const fillSquare = ({ state, connectionId, args }) => {
  let player = null
  if (connectionId === state.crossesPlayer) {
    player = CROSSES;
  } else if (connectionId === state.noughtsPlayer) {
    player = NOUGHTS;
  } else {
    throw new Error('Connection is not a player');
  }

  if (state.board[args.position] !== null) {
    throw new Error('Position filled');
  }

  const board = [...state.board.splice(args.position, 1, player)];

  return ({
    ...state,
    board,
  })
}

const TicTacToe = {
  clientMoves: [
    fillSquare,
  ],
  
  hostMoves: [
    startGame,
  ],
}

export default TicTacToe;
