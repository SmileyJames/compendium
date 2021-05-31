import game from "./index";

describe("Players Component", () => {
  describe("Guest Moves", () => {
    test("Join as a player", () => {
      const state = {
        players: {
          maxPlayers: 4,
          minPlayers: 4,
          everyoneIsIn: false,
          list: []
        }
      };
      const args = { name: "SmileyJames", emoji: null };
      const callerId = "xxx";
      const newState = game.joinAsAPlayer({ state, args, callerId });
      expect(newState).toEqual({
        players: {
          maxPlayers: 4,
          minPlayers: 4,
          everyoneIsIn: false,
          list: [
            { name: "SmileyJames", emoji: null, connectionId: "xxx" },
          ]
        }
      });
    })
  })

  describe("Host Moves", () => {
    test("Initialise the players state", () => {
      const state = { iLove: "you" };
      const callerId = "xxx";
      const args = { maxPlayers: 4, minPlayers: 4 };
      const newState = game.initPlayers({ state, args, callerId });
      expect(newState).toEqual({
        iLove: "you",
        players: {
          maxPlayers: 4,
          minPlayers: 4,
          everyoneIsIn: false,
          list: []
        }
      });
    })

    test("Announce everyone is in - start the game", () => {
      const state = {
        players: {
          maxPlayers: 3,
          minPlayers: 3,
          everyoneIsIn: false,
          list: [
            { name: "SmileyJames", emoji: null, connectionId: "xxx" },
            { name: "SmileyJbmes", emoji: null, connectionId: "xox" },
            { name: "SmileyJcmes", emoji: null, connectionId: "oxo" },
          ]
        }
      };
      const connectionId = "xxx";
      const newState = game.everyoneIsIn({ state, connectionId });
      expect(newState).toEqual({
        players: {
          maxPlayers: 3,
          minPlayers: 3,
          everyoneIsIn: true,
          list: [
            { name: "SmileyJames", emoji: null, connectionId: "xxx" },
            { name: "SmileyJbmes", emoji: null, connectionId: "xox" },
            { name: "SmileyJcmes", emoji: null, connectionId: "oxo" },
          ]
        }
      })

    })
  })
})
