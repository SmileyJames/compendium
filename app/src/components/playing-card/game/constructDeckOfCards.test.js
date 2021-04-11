import constructDeckOfCards from "./constructDeckOfCards";

describe("constructDeckOfCards", () => {
  test("without jokers", () => {
    const deck = constructDeckOfCards();
    expect(deck.length).toBe(52);
  });

  test("with jokers", () => {
    const deck = constructDeckOfCards({ jokers: 4 });
    expect(deck.length).toBe(56);
  });
});
