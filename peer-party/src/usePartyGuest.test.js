jest.mock('peerjs')
import Peer from "peerjs";
import { renderHook, act } from '@testing-library/react-hooks';
import usePartyGuest from "./usePartyGuest";
import PeerJS from "peerjs";

let mockReceiveSync;
const mockSendEmit = jest.fn();

PeerJS.mockImplementation(() => ({
  connect: () => ({
    on: (eventName, callback) => {
      if (eventName === "data") {
        mockReceiveSync = callback;
      } else {
        callback();
      }
    },
    send: mockSendEmit,
  }),
  on: (_, callback) => callback(),
  id: "id",
  destroy: () => {},
}))

const start = () => ({ number: 0 });
const increment = ({ args, state: { number } }) =>
  ({ number: number + (args && args.value || 1) });

const game = {
  guestMoves: {
    start,
    increment,
  },
  hostMoves: {}
};

describe("usePartyGuest", () => {
  test("Test state is maintained correctly whilst emitting from guest and syncing from host", () => {
    const { rerender, result } = renderHook(() =>
      usePartyGuest({ id: "hello", roomId: "hello-world", game })
    );

    expect(result.current.state).toBeTruthy();
    expect(result.current.moves).toBeFalsy();

    rerender();

    expect(result.current.moves).toBeTruthy();

    act(() => {
      result.current.moves.start();
    })

    expect(result.current.state.number).toBe(0);
    expect(mockSendEmit).toHaveBeenCalledWith({
      args: undefined,
      index: 0,
      move: "start",
    });

    act(() => {
      result.current.moves.increment();
    })

    expect(result.current.state.number).toBe(1);
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      args: undefined,
      index: 0,
      move: "increment",
    });

    act(() => {
      mockReceiveSync([
        { move: "start" },
        { move: "increment" },
      ])
    })

    expect(result.current.state.number).toBe(1);
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 2,
    });

    act(() => {
      mockReceiveSync([
        { connectionId: "unique-id", args: { value: 5 }, move: "increment" },
      ])
    })

    expect(result.current.state.number).toBe(6);
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 3,
    });

  });
});
