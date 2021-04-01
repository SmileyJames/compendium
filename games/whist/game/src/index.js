import playersGame from "@compendium/players-game";
import { constructDeckOfCards } from "@compendium/playing-card";

const connectionIsHosts = ({ roomId, connectionId }) => (
  roomId === connectionId
);

const startGame = ({ state, roomId, connectionId }) => {
  const newState = { ...state, discard: [] };
  const isHost = connectionIsHosts({ roomId, connectionId });
  if (isHost) {
    newState.deck = constructDeckOfCards();
  } else {
    newState.hand = []
  }
  return newState;
}

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
