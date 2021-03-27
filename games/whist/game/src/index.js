import playersGame from "@compendium/players-game";

const game = {
  guestMoves: {
    ...playersGame.guestMoves,
  },
  
  hostMoves: {
    ...playersGame.hostMoves,
  },
}

export default game;
