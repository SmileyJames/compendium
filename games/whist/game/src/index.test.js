import whist from "./index";
import { constructDeckOfCards } from "@compendium/playing-card";

const orderedDeckOfPlayingCards = constructDeckOfCards();
const shuffledDeckOfPlayingCards = [];
const shuffledHand = []


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

  describe.skip("Secretly shuffle and deal the cards", () => {

    test("from the host's perspective", () => {
      const state = { players };
      const result = whist.hostMoves.deal({ state, connectionId: roomId, roomId });
      expect(result).toStrictEqual({
        players,
        deck: shuffledDeckOfPlayingCards,
        discard: [],
      })
    });

    test("from a guest's perspective", () => {
      const state = { players }
      const result = whist.hostMoves.deal({ state, connectionId: "xxx", roomId });
      expect(result).toStrictEqual({
        players,
        discard: [],
        hand: shuffledHand,
      })
    });

  });

});
