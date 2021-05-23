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
    { name: "JJ", emoji: null, connectionId: "xxx" },
    { name: "JO", emoji: null, connectionId: "xxx" },
    { name: "OJ", emoji: null, connectionId: "xxx" },
    { name: "OO", emoji: null, connectionId: "xxx" },
  ],
  everyoneIsIn: true,
}
const roomId = "123";
const connections = ["xxx", "xox", "oxo", "ooo"];

describe("whist game rules", () => {
  describe("Everyone is in, let's start the game...", () => {

    test("from the host's perspective", () => {
      const state = { players }
      const result = whist.hostMoves.startGame({ state, connectionId: roomId, roomId });
      expect(result).toStrictEqual({
        players,
        deck: orderedDeckOfPlayingCards,
        discard: [],
      })
    });

    test("from a guest's perspective", () => {
      const state = { players }
      const result = whist.hostMoves.startGame({ state, connectionId: "xxx", roomId });
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
      const result = whist.hostMoves.deal({ state, random, revealSecret, connectionId: roomId, roomId });
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
      const result = whist.hostMoves.deal({ state: guestState, random, revealSecret, connectionId: "xxx", roomId });
      expect(result.hand.length).toBe(13)
      expect(result).toStrictEqual({
        players,
        discard: [],
        hand: shuffledHand,
      })
    });

  });

});
