import PeerJS from "peerjs";
import { renderHook, act } from '@testing-library/react-hooks';
import usePartyHost from "./usePartyHost";
import { withRandom } from "../random";

jest.useFakeTimers();
jest.mock('peerjs')

let mockReceiveEmit;
const mockSendSync = jest.fn();
PeerJS.mockImplementation(() => ({
  on: (eventName, callback) => {
    if (eventName === "connection") {
      callback({
        peer: "hello",
        on: (_eventName, _callback) => {
          if (_eventName === "data") {
            mockReceiveEmit = _callback;
          } else if (_eventName === "open") {
            _callback();
          }
        },
        send: mockSendSync,
      })
    } else if (eventName === "open") {
      callback();
    }
  },
  id: "room-id",
  destroy: () => {},
}))

const start = jest.fn(() => ({ number: 0 }));
const increment = jest.fn(({ args, state: { number } }) =>
  ({ number: number + ((args && args.value) || 1) }));
const flipCoin = withRandom(
  jest.fn(
    ({ state, random }) => ({
      ...state,
      flipped: random() > 0.5
    })
  )
);

const game = {
  guestMoves: {
    increment,
    flipCoin,
  },
  hostMoves: {
    start,
    increment,
  }
};

describe("usePartyHost", () => {
  test("The host can call moves locally and maintains a local state", () => {
    const { unmount, result } = renderHook(() =>
      usePartyHost({ roomId: "room-id", game })
    );

    expect(result.current.state).toBeTruthy();
    expect(result.current.moves).toBeTruthy();

    act(() => {
      result.current.moves.start();
    })

    expect(start).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: "room-id",
      roomId: "room-id",
      state: {}
    });
    expect(result.current.state.number).toBe(0);
    expect(mockSendSync).toHaveBeenCalledWith([
      { index: 0, args: undefined, connectionId: "room-id", move: "start" }
    ])

    act(() => {
      result.current.moves.increment();
    })

    expect(increment).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: "room-id",
      roomId: "room-id",
      state: {
        number: 0,
      }
    });
    expect(result.current.state.number).toBe(1);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 0, args: undefined, connectionId: "room-id", move: "start" },
      { index: 1, args: undefined, connectionId: "room-id", move: "increment" }
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

    expect(increment).toHaveBeenLastCalledWith({
      args: undefined,
      connectionId: "room-id",
      roomId: "room-id",
      state: {
        number: 1,
      }
    });
    expect(result.current.state.number).toBe(2);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: "room-id", move: "increment" }
    ])

    act(() => {
      mockReceiveEmit({
        index: 1,
        move: "increment",
        args: { value: 2 },
      })
    })

    expect(increment).toHaveBeenLastCalledWith({
      args: { value: 2 },
      connectionId: "hello",
      roomId: "room-id",
      state: {
        number: 2,
      }
    });
    expect(result.current.state.number).toBe(4);
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 2, args: undefined, connectionId: "room-id", move: "increment" },
      { index: 3, args: { value: 2 }, connectionId: "hello", move: "increment" }
    ])

    act(() => {
      mockReceiveEmit({
        index: 3,
        move: "flipCoin",
        args: {},
      })
    })

    expect(result.current.state.flipped).toBe(true);
    expect(mockSendSync).toHaveBeenCalled();

    unmount();
  });
});
