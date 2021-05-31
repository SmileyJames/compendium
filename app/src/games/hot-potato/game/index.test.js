import game from "./index"

const players = { list: [
    { callerId: "1" },
    { callerId: "2" },
    { callerId: "3" },
    { callerId: "4" }
]}

describe("Hot Potato Game", () => {
        test("Pass the potato", () => {
            const callerId = "2";
            const state = { players }
            let contextId = "2"
            const revealSecret = (contextId) => (contextId === "2")
            const random = () => 0.2
            let result = game.passPotato({ state, contextId, revealSecret, random, callerId });
            expect(result).toStrictEqual({ ...state, hotPotato: false });
            contextId = "1"
            result = game.passPotato({ state, contextId, revealSecret, random, callerId });
            expect(result).toStrictEqual({ ...state, hotPotato: true })
        })

        test("Cannot pass potato if player doesn't have it", () => {
            const state = { players }
            const contextId = "2"
            const revealSecret = (contextId) => (contextId === "2")
            const random = () => 0.2
            expect(() => {
                game.passPotato({ state, contextId, revealSecret, random, callerId: "1" });
            }).toThrowError();
        })

        test("Set the background colour", () => {
            const state = { other: "key" }
            const args = { backgroundColour: "red" }
            const result = game.setBackgroundColour({ state, args });
            expect(result).toStrictEqual({ backgroundColour: "red", other: "key" });
        })

        test("Throw the potato to the guests", () => {
            const state = { players }
            const contextId = "4"
            const random = () => 0.9;
            const result = game.throwPotato({ state, contextId, random });
            expect(result).toStrictEqual({ ...state, hotPotato: true })
        })

        test("Stop the music, hot potato holder is the loser", () => {
            const state = { players }
            const revealSecret = (contextId) => (contextId === "3");
            const result = game.stopMusic({ state, revealSecret });
            expect(result).toStrictEqual({ ...state, loser: "3" })
        })
})
