import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { constructMoves, constructReducer, constructPeer, destructPeer } from "./shared";

const connect = ({ roomId, peer, conn }) => {
  conn.current = peer.current.connect(roomId);
}

const increaseLogSize = (logSize, value) => logSize.current += value;

const ack = ({ conn, logSize }) =>  
  conn.current.send({ index: logSize.current })

const sync = ({ state, setCache, roomId, game, events }) => {
  const reducer = constructReducer({ game, roomId, events })
  state.current = reducer(cloneDeep(state.current));
  setCache(() => cloneDeep(state.current));
}

const emit = ({ conn, logSize, move, args }) => {
  conn.current.send({ index: logSize.current, move, args })
}

const preempt = ({ setCache, game, move, args, connectionId, roomId }) => {
  const reducer = constructReducer({ game, roomId, events: [{ move, args, connectionId }] })
  setCache(reducer);
}

const constructMovesHandler = ({ conn, moves, setCache, game, logSize, roomId }) => {
  const connectionId = conn.current.peer;
  const handleMove = ({ move, args }) => {
    preempt({ setCache, game, move, args, roomId, connectionId })
    emit({ conn, move, args, logSize })
  }
  constructMoves({ game, connectionId, roomId, moves, handleMove });
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
      constructMovesHandler({ conn, moves, setCache, roomId, game, logSize })

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
