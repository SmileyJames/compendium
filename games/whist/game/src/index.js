import playersGame from "@compendium/players-game";

const startGame = () => {}

const deal = () => {}

const game = {
  guestMoves: {
    ...playersGame.guestMoves,
  },
  
  hostMoves: {
    ...playersGame.hostMoves,
    startGame,
    deal,
  },
}

export default game;
