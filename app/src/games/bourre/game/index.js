const startGame = ({ state, callerId, args }) => {
  return { board: [] };
}

const flipCoin = ({ state, callerId, args }) => (random) => {
  return { ...state, isHeads: random() > 0.5 }
}

const game = {
  flipCoin,
  startGame,
}

export default game;
