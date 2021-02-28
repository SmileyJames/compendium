import { useEffect, useRef } from "react";
import { constructMoves, constructReducer, constructPeer, destructPeer } from "./shared";
import { useStorageState } from 'react-storage-hooks';
import { v4 as uuid } from "uuid";

const connect = ({ roomId, peer, conn }) => {
  conn.current = peer.current.connect(roomId);
}

const increaseLogSize = ({ setLogSize, value }) => setLogSize(logSize => logSize + value)

const ack = ({ conn, logSize }) => {
  conn.current.send({ index: logSize })
}

const emit = ({ conn, logSize, move, args }) => {
  conn.current.send({ index: logSize, move, args })
}

const sync = ({ setState, setCache, roomId, game, events }) => {
  const reducer = constructReducer({ game, roomId, events })
  setState(({ state }) => {
    const newState = reducer(state);
    return { state: newState, cache: newState }
  });
}

const preempt = ({ setState, game, move, args, connectionId, roomId }) => {
  const reducer = constructReducer({ game, roomId, events: [{ move, args, connectionId }] })
  setState(({ state, cache }) => ({
    cache: reducer(state),
    state,
  }));
}

const constructMovesHandler = ({ conn, connectionId, moves, setState, game, logSize, roomId }) => {
  const handleMove = ({ move, args }) => {
    preempt({ setState, game, move, args, roomId, connectionId })
    emit({ conn, move, args, logSize })
  }
  constructMoves({ game, connectionId, roomId, moves, handleMove });
}

const useConnection = ({ conn, connectionId, roomId, onOpen, onData, dependants }) => {
  const peer = useRef();
  useEffect(() => {
    if (!roomId) return;

    constructPeer({ peer, id: connectionId })

    peer.current.on("open", () => {
      console.log("open guest");
      connect({ conn, peer, roomId });
      onOpen();
      conn.current.on("data", onData);
    });

    return () => destructPeer({ peer })

  }, dependants)
}

const usePartyGuest = ({ roomId, game }) => {
  const conn = useRef();
  const moves = useRef();

  const [{ cache }, setState] = useStorageState(
    window.localStorage,
    `guestState-${roomId}`,
    { state: {}, cache: {} }
  );
  const [logSize, setLogSize] = useStorageState(
    window.localStorage,
    `logSize-${roomId}`,
    0
  );
  const [id, setId] = useStorageState(
    window.localStorage,
    `id-${roomId}`,
    null
  );
  useEffect(() => {
    if (id) return;
    setId(() => uuid()) 
  }, [id, setId])

  const onOpen = () => {
    constructMovesHandler({ conn, connectionId: id, moves, setState, roomId, game, logSize })
  }
  const onData = (events) => {
    ack({ conn, logSize: logSize + events.length })
    increaseLogSize({ setLogSize, value: events.length });
    sync({ setState, roomId, game, events })
  }
  const dependants = [
    conn, moves, roomId, setState,
    game, logSize, setLogSize, onData, onOpen
  ];
  useConnection({ conn, connectionId: id, roomId, onOpen, onData, dependants })

  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
