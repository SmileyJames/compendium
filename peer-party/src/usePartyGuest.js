import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const usePartyGuest = ({ roomId, game }) => {

  const peer = useRef();
  const conn = useRef();
  const moves = useRef();

  const logSize = useRef(0);
  const state = useRef({});
  const [cache, setCache] = useState({});

  useEffect(() => {

    moves.current = new Proxy({}, {
      get: (_, move) => (args) => {
        setCache(c => game.guestMoves[move]({ state: c, args, connectionId: peer.current.id }))
        conn.current.send({ index: logSize.current, move, args })
      }
    });

    peer.current = new Peer();
    conn.current = peer.current.connect(roomId);

    conn.current.on("data", (events) => {
      logSize.current += events.length;

      state.current = events.reduce(
        ({ move, args, connectionId }, o) => game.guestMoves[move]({ state: o, args, connectionId }),
        state.current);

      setCache(state.current);

      conn.current.send({ index: logSize.current })
    });

    return () => {
      peer.current.destroy();
      peer.current = null;
    }

  }, [roomId, game])


  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
