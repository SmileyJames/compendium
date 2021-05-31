import { constructDeckOfCards } from "components/playing-card";
import { withRandom, withSecret, shuffle } from "@compendium/peer-party";

const contextIsHosts = ({ roomId, contextId }) => (
  roomId === contextId 
);

const startGame = withSecret(({ state, roomId, contextId }) => {
  const newState = { ...state, discard: [] };
  const isHost = contextIsHosts({ roomId, contextId });
  if (isHost) {
    newState.deck = constructDeckOfCards();
  } else {
    newState.hand = []
  }
  return newState;
})

const deal = withRandom(withSecret(({ state, random, roomId, contextId, revealSecret }) => {
  const deck = revealSecret(roomId, s => s.deck)
  const shuffledDeck = shuffle({ random, array: deck })
  const isHost = contextIsHosts({ roomId, contextId })
  if (isHost) {
    return { ...state, deck: [] }
  } else {
    const playerIndex = state.players.list.findIndex(
      player => player.connectionId === contextId
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
  startGame,
  deal,
}

export default game;
