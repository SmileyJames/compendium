import Peer from "peerjs";
import { renderHook, act } from '@testing-library/react-hooks';
import usePartyGuest from "./usePartyGuest";

let dataCallback;
jest.mock('peerjs', () => (
  jest.fn().mockImplementation(() => ({
    connect: () => ({
      on: (eventName, callback) => {
        if (eventName === "data") {
          dataCallback = callback;
        } else {
          callback();
        }
      },
      send: () => {},
    }),
    on: (_, callback) => callback(),
    id: "id",
    destroy: () => {},
  }))
));

const start = () => ({ number: 0 });
const increment = ({ state: { number } }) => ({ number: number + 1 });

const game = {
  guestMoves: {
    start,
    increment,
  },
  hostMoves: {}
};

describe("usePartyGuest", () => {
  test("A simple test of local guest state management (pre-emptive)", () => {
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

    act(() => {
      result.current.moves.increment();
    })

    expect(result.current.state.number).toBe(1);
  });
});
