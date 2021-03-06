import PeerJS from "peerjs";
import { renderHook, act } from '@testing-library/react-hooks';
import usePartyHost from "./usePartyHost";

jest.useFakeTimers();
jest.mock('peerjs')

let mockReceiveEmit;
const mockSendSync = jest.fn();
PeerJS.mockImplementation(() => ({
  on: (eventName, callback) => {
    if (eventName === "connection") {
      callback({
        peer: "hello",
        on: (_eventName, callback) => {
          if (_eventName === "data") {
            mockReceiveEmit = callback;
          }
        },
        send: mockSendSync,
      })
    } else if (eventName === "open") {
      callback();
    }
  },
  id: "hello-world",
  destroy: () => {},
}))

const start = () => ({ number: 0 });
const increment = ({ args, state: { number } }) =>
  ({ number: number + ((args && args.value) || 1) });

const game = {
  guestMoves: {
    increment,
  },
  hostMoves: {
    start,
    increment,
  }
};

describe("usePartyHost", () => {
  test("The host can call moves locally and maintains a local state", () => {
    const { unmount, result } = renderHook(() =>
      usePartyHost({ roomId: "hello-world", game })
    );

    expect(result.current.state).toBeTruthy();
    expect(result.current.moves).toBeTruthy();

    act(() => {
      result.current.moves.start();
    })

    expect(result.current.state.number).toBe(0);
    expect(mockSendSync).toHaveBeenCalledWith([
      { index: 0, args: undefined, connectionId: "hello-world", move: "start" }
    ])

    act(() => {
      result.current.moves.increment();
    })

    expect(result.current.state.number).toBe(1);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 0, args: undefined, connectionId: "hello-world", move: "start" },
      { index: 1, args: undefined, connectionId: "hello-world", move: "increment" }
    ])

    act(() => {
      mockReceiveEmit({
        index: 1,
      })
    })

    expect(mockSendSync).toHaveBeenCalledTimes(2)

    act(() => {
      result.current.moves.increment();
    })
    expect(result.current.state.number).toBe(2);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: "hello-world", move: "increment" }
    ])

    act(() => {
      mockReceiveEmit({
        index: 1,
        move: "increment",
        args: { value: 2 },
      })
    })

    expect(result.current.state.number).toBe(4);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: "hello-world", move: "increment" },
      { index: 3, args: { value: 2 }, connectionId: "hello", move: "increment" }
    ])

    unmount();
  });
});
