import Peer from "peerjs";

export const constructPeer = ({ peer, id }) => {
  peer.current = new Peer(id);
}

export const destructPeer = ({ peer }) => {
  peer.current.destroy();
  peer.current = null;
}

const getMoveFunction = ({ connectionId, roomId, game, move }) => (
  (connectionId === roomId ? game.hostMoves : game.guestMoves)[move]
)

export const constructReducer = ({ game, events, roomId }) => (state) => {
  try {
    return events.reduce(
      (o, event) => {
        const moveFn = getMoveFunction({ connectionId: event.connectionId, roomId, game, move: event.move })
        return moveFn({ state: o, connectionId: event.connectionId, args: event.args });
      },
      state
    );
  } catch (e) {
    console.error(e);
    return state;
  }
}

export const constructMoves = ({ game, connectionId, roomId, moves, handleMove }) => {
  moves.current = new Proxy({}, {
    get: (_, move) => {
      try {
        const moveFn = getMoveFunction({ connectionId, roomId, game, move })
        return (args) => handleMove({ move, args });
      } catch (e) {
        return Reflect.get(...arguments)
      }
    }
  });
}
