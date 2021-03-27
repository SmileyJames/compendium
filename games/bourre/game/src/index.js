const startGame = ({ state, connectionId, args }) => {
  return { board: [] };
}

const flipCoin = ({ state, connectionId, args }) => (random) => {
  return { ...state, isHeads: random() > 0.5 }
}

const game = {
  guestMoves: {
    flipCoin,
  },
  
  hostMoves: {
    startGame,
  },
}

export default game;
