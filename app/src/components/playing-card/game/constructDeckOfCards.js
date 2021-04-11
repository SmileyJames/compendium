import { JOKER, SUITS, VALUES } from "./model";

const constructDeckOfCards = ({ jokers = 0 } = {}) => {
  const cards = []
  for (let suit of SUITS) {
    for (let value of VALUES) {
      cards.push({ suit, value });
    }
  }

  for (let i = 0; i < jokers; i++) {
    cards.push({ suit: null, value: JOKER });
  }

  return cards;
}


export default constructDeckOfCards;
