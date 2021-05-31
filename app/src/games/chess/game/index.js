import Chess from 'chess.js';

const game = {
  chessMove: ({ state, args }) => {
    const chess = new Chess(state.board);
    if (!chess.move(args.chessMove)) {
      throw new Error("Invalid move")
    }
    return { ...state, board: chess.fen() }
  }
}

export default game;
