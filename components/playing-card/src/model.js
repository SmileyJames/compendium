class Card {
  constructor({ suit, value, back, key }) {
    this.suit = suit
    this.value = value
    this.back = back
    this.key = key
  }
}

const SUITS = ['H', 'D', 'S', 'C']
const JOKER = 0,
  ACE = 1,
  JACK = 11,
  QUEEN = 12,
  KING = 13
const VALUES = [ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING]

export {
  Card,
  SUITS,
  VALUES,
  JOKER,
  ACE,
  JACK,
  QUEEN,
  KING,
}
