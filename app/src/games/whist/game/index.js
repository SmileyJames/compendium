import playersGame from "components/players/game"
import { constructDeckOfCards } from "components/playing-card";
import { withRandom, withSecret, shuffle } from "@compendium/peer-party";

const connectionIsHosts = ({ roomId, connectionId }) => (
  roomId === connectionId
);

const startGame = withSecret(({ state, roomId, connectionId }) => {
  const newState = { ...state, discard: [] };
  const isHost = connectionIsHosts({ roomId, connectionId });
  if (isHost) {
    newState.deck = constructDeckOfCards();
  } else {
    newState.hand = []
  }
  return newState;
})

const deal = withRandom(withSecret(({ state, random, roomId, connectionId, revealSecret }) => {
  const deck = revealSecret(roomId, s => s.deck)
  const shuffledDeck = shuffle({ random, array: deck })
  const isHost = connectionIsHosts({ roomId, connectionId })
  if (isHost) {
    return { ...state, deck: [] }
  } else {
    const playerIndex = state.players.list.findIndex(
      player => player.connectionId === connectionId
    )
    const hand = shuffledDeck.filter(
      (_, index) => {
        return (index % state.players.list.length) === playerIndex
      }
    )
    return { ...state, hand }
  }
}))

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
