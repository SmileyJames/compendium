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

const start = () => ({ number: 0 });
const increment = ({ args, state: { number } }) =>
  ({ number: number + ((args && args.value) || 1) });
const flipCoin = ({ state }) => (random) => ({
  ...state,
  flipped: random() > 0.5
});

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

    expect(result.current.state.number).toBe(0);
    expect(mockSendSync).toHaveBeenCalledWith([
      { index: 0, args: undefined, connectionId: "room-id", move: "start" }
    ])

    act(() => {
      result.current.moves.increment();
    })

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
    expect(mockSendSync).toHaveBeenLastCalledWith([
      { index: 4, args: {}, connectionId: "hello", move: "flipCoin", seed: 0.8619044772223384 }
    ])

    unmount();
  });
});
