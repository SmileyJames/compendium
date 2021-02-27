import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import cloneDeep from "lodash/cloneDeep";

const constructPeer = ({ peer, id }) => {
  peer.current = new Peer(id);
};

const destructPeer = ({ peer }) => {
  peer.current.destroy();
  peer.current = null;
}

const connect = ({ roomId, peer, conn }) => {
  conn.current = peer.current.connect(roomId);
}

const increaseLogSize = (logSize, value) => logSize.current += value;

const ack = ({ conn, logSize }) =>  
  conn.current.send({ index: logSize.current })

const sync = ({ state, setCache, roomId, game, events }) => {

  const reduceMove = (o, { move, args, connectionId }) => {
    const reducer = connectionId === roomId ? game.hostMoves[move] : game.guestMoves[move];
    try {
      return reducer({ state: o, args, connectionId });
    } catch (e) {
      console.error(e);
      return o;
    }
  }

  state.current = events.reduce(reduceMove, cloneDeep(state.current));
  setCache(() => cloneDeep(state.current));
}

const emit = ({ conn, logSize, move, args }) => 
  conn.current.send({ index: logSize.current, move, args })

const preempt = ({ game, move, args, setCache, peer }) => {
  setCache(c => {
    try {
      return game.guestMoves[move]({ state: c, args, connectionId: peer.current.id })
    } catch (e) {
      console.error(e);
      return c;
    }
  })
}

const constructMovesHandler = ({ conn, moves, setCache, peer, game, logSize }) => {
  moves.current = new Proxy({}, {
    get: (_, move) => (args) => {
      preempt({ game, move, args, setCache, peer })
      emit({ conn, move, args, logSize })
    }
  });
}

const usePartyGuest = ({ id, roomId, game }) => {

  const peer = useRef();
  const conn = useRef();
  const moves = useRef();

  const logSize = useRef(0);
  const state = useRef({});
  const [cache, setCache] = useState({});

  useEffect(() => {

    if (!id || !game) return undefined;

    constructPeer({ peer, id })

    peer.current.on("open", () => {

      connect({ conn, peer, roomId });
      constructMovesHandler({ conn, moves, setCache, peer, game, logSize })

      conn.current.on("data", (events) => {
        increaseLogSize(logSize, events.length);
        sync({ state, setCache, roomId, game, events })
        ack({ conn, logSize })
      });

    });

    return () => destructPeer({ peer })

  }, [id, roomId, game])


  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
