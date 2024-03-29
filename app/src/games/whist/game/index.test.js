import whist from "./index";
import { constructDeckOfCards } from "components/playing-card";

const orderedDeckOfPlayingCards = constructDeckOfCards();
const shuffledHand = [
  { suit: 'S', value: 1 },
  { suit: 'S', value: 3 },
  { suit: 'S', value: 5 },
  { suit: 'S', value: 7 },
  { suit: 'S', value: 9 },
  { suit: 'S', value: 11 },
  { suit: 'S', value: 13 },
  { suit: 'C', value: 2 },
  { suit: 'C', value: 4 },
  { suit: 'C', value: 6 },
  { suit: 'C', value: 8 },
  { suit: 'C', value: 10 },
  { suit: 'C', value: 12 },
]
const random = () => 0.5;


const players = {
  list: [
    { name: "JJ", emoji: null, callerId: "xxx" },
    { name: "JO", emoji: null, callerId: "xxx" },
    { name: "OJ", emoji: null, callerId: "xxx" },
    { name: "OO", emoji: null, callerId: "xxx" },
  ],
  everyoneIsIn: true,
}
const hostId = "123";

describe("whist game rules", () => {
  describe("Everyone is in, let's start the game...", () => {

    test("from the host's perspective", () => {
      const state = { players }
      const result = whist.startGame({ state, contextId: hostId, hostId });
      expect(result).toStrictEqual({
        players,
        deck: orderedDeckOfPlayingCards,
        discard: [],
      })
    });

    test("from a guest's perspective", () => {
      const state = { players }
      const result = whist.startGame({ state, callerId: "xxx", hostId });
      expect(result).toStrictEqual({
        players,
        discard: [],
        hand: [],
      })
    });

  });

  describe("Secretly shuffle and deal the cards", () => {

    test("from the host's perspective", () => {
      const state = { players, discard: [], deck: orderedDeckOfPlayingCards };
      const revealSecret = (_, fn) => fn(state)
      const result = whist.deal({ state, random, revealSecret, contextId: hostId, hostId });
      expect(result).toStrictEqual({
        players,
        deck: [],
        discard: [],
      })
    });

    test("from a guest's perspective", () => {
      const hostState = { players, discard: [], deck: orderedDeckOfPlayingCards };
      const guestState = { players, discard: [] };
      const revealSecret = (_, fn) => fn(hostState)
      const result = whist.deal({ state: guestState, random, revealSecret, contextId: "xxx", hostId });
      expect(result.hand.length).toBe(13)
      expect(result).toStrictEqual({
        players,
        discard: [],
        hand: shuffledHand,
      })
    });

  });

});
