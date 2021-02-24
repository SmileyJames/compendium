import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import cloneDeep from "lodash/cloneDeep";

const usePartyGuest = ({ id, roomId, game }) => {

  const peer = useRef();
  const conn = useRef();
  const moves = useRef();

  const logSize = useRef(0);
  const state = useRef({});
  const [cache, setCache] = useState({});

  useEffect(() => {

    if (!id || !game) return undefined;

    peer.current = new Peer(id);

    peer.current.on("open", () => {
      conn.current = peer.current.connect(roomId);


      conn.current.on("data", (events) => {

        logSize.current += events.length;

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

        conn.current.send({ index: logSize.current })
      });

      moves.current = new Proxy({}, {
        get: (_, move) => (args) => {
          setCache(c => {
            try {
              return game.guestMoves[move]({ state: c, args, connectionId: peer.current.id })
            } catch (e) {
              console.error(e);
              return c;
            }
          })
          conn.current.send({ index: logSize.current, move, args })
        }
      });
    });

    return () => {
      peer.current.destroy();
      peer.current = null;
    }

  }, [id, roomId, game])


  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
