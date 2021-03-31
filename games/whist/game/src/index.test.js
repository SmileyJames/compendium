import whist from "./index";

describe("whist game rules", () => {
  describe("Everyone is in, let's start the game...", () => {

    test("from the host's perspective", () => {
      const roomId = "123";
      const connections = ["xxx", "xox", "oxo", "ooo"];
      const state = {
        players: {
          list: [
            { name: "JJ", emoji: null, connectionId: "xxx" },
            { name: "JO", emoji: null, connectionId: "xxx" },
            { name: "OJ", emoji: null, connectionId: "xxx" },
            { name: "OO", emoji: null, connectionId: "xxx" },
          ],
          everyoneIsIn: true,
        }
      }
      const result = whist.hostMoves.startGame({ state, connectionId: roomId, roomId });
      expect(result).toBe({
        deck: orderedDeckOfPlayingCards,
        dicard: [],
      })
    });

    test("from a guest's perspective", () => {
      const roomId = "123";
      const connections = ["xxx", "xox", "oxo", "ooo"];
      const state = {
        players: {
          list: [
            { name: "JJ", emoji: null, connectionId: "xxx" },
            { name: "JO", emoji: null, connectionId: "xxx" },
            { name: "OJ", emoji: null, connectionId: "xxx" },
            { name: "OO", emoji: null, connectionId: "xxx" },
          ],
          everyoneIsIn: true,
        }
      }
      const result = whist.guestMoves.startGame({ state, connectionId: "xxx", roomId });
      expect(result).toBe({
        discard: [],
        hand: [],
      })
    });

  });

  describe("Secretly shuffle and deal the cards", () => {

    test("from the host's perspective", () => {
      const roomId = "123";
      const connections = ["xxx", "xox", "oxo", "ooo"];
      const state = {
        players: {
          list: [
            { name: "JJ", emoji: null, connectionId: "xxx" },
            { name: "JO", emoji: null, connectionId: "xxx" },
            { name: "OJ", emoji: null, connectionId: "xxx" },
            { name: "OO", emoji: null, connectionId: "xxx" },
          ],
          everyoneIsIn: true,
        }
      }
      const result = whist.hostMoves.deal({ state, connectionId: roomId, roomId });
      expect(result).toBe({
        deck: shuffledDeckOfPlayingCards,
        discard: [],
      })
    });

    test("from a guest's perspective", () => {
      const roomId = "123";
      const connections = ["xxx", "xox", "oxo", "ooo"];
      const state = {
        players: {
          list: [
            { name: "JJ", emoji: null, connectionId: "xxx" },
            { name: "JO", emoji: null, connectionId: "xxx" },
            { name: "OJ", emoji: null, connectionId: "xxx" },
            { name: "OO", emoji: null, connectionId: "xxx" },
          ],
          everyoneIsIn: true,
        }
      }
      const result = whist.hostMoves.deal({ state, connectionId: "xxx", roomId });
      expect(result).toBe({
        discard: [],
        hand: shuffledHand,
      })
    });

  });

});
