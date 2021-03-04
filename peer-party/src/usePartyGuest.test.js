import { renderHook, act } from '@testing-library/react-hooks';
import usePartyGuest from "./usePartyGuest";
import PeerJS from "peerjs";

jest.useFakeTimers();
jest.mock('peerjs')
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
  on: (eventName, callback) => {
    if (eventName === "open") {
      callback();
    }
  },
  id: "id",
  destroy: () => {},
}))

const start = () => ({ number: 0 });
const increment = ({ args, state: { number } }) => {
  const increase = (args && args.value) ? args.value : 1;
  const num = number || 0;
  const output = ({ number: num + increase });
  return output;
}

const game = {
  guestMoves: {
    start,
    increment,
  },
  hostMoves: {}
};

describe("usePartyGuest", () => {
  test("State is maintained correctly whilst emitting from guest and syncing from host", () => {
    const { unmount, rerender, result } = renderHook(() =>
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
        { index: 0, move: "start" },
        { index: 1, move: "increment" },
      ])
    })

    expect(result.current.state.number).toBe(1);
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 1,
    });

    act(() => {
      mockReceiveSync([
        { index: 2, connectionId: "unique-id", args: { value: 5 }, move: "increment" },
      ])
    })

    expect(result.current.state.number).toBe(6);
    expect(mockSendEmit).toHaveBeenLastCalledWith({
      index: 2,
    });

    unmount();
  });
});
