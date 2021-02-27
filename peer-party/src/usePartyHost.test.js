import Peer from "peerjs";
import { renderHook, act } from '@testing-library/react-hooks';
import usePartyHost from "./usePartyHost";

let dataCallback;
jest.mock('peerjs', () => (
  jest.fn().mockImplementation(() => ({
    on: (eventName, callback) => {
      if (eventName === "connection") {
        callback({
          peer: "hello",
          on: (eventName, callback) => {
            if (eventName === "data") {
              dataCallback = callback;
            } else {
              callback();
            }
          },
          send: () => {},
        })
      } else {
        callback()
      }
    },
    id: "hello-world",
    destroy: () => {},
  }))
));

const start = () => ({ number: 0 });
const increment = ({ state: { number } }) => ({ number: number + 1 });

const game = {
  guestMoves: {},
  hostMoves: {
    start,
    increment,
  }
};

describe("usePartyGuest", () => {
  test("A simple test of local guest state management (pre-emptive)", () => {
    const { rerender, result } = renderHook(() =>
      usePartyHost({ roomId: "hello-world", game })
    );

    expect(result.current.state).toBeTruthy();
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
