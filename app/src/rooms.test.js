import { createRoomId, decodeCompendiumIndex } from "./rooms";

describe("rooms and their ids", () => {
  test("encoding then decoding game index 0", () => {
    const roomId = createRoomId(0);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(0);
  })

  test("encoding then decoding game index 1", () => {
    const roomId = createRoomId(1);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(1);
  })

  test("encoding then decoding game index 2", () => {
    const roomId = createRoomId(2);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(2);
  })

  test("encoding then decoding game index 3", () => {
    const roomId = createRoomId(3);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(3);
  })

  test("encoding then decoding game index 4", () => {
    const roomId = createRoomId(4);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(4);
  })

  test("encoding then decoding game index 5", () => {
    const roomId = createRoomId(5);
    const index = decodeCompendiumIndex(roomId);
    expect(index).toBe(5);
  })

})
