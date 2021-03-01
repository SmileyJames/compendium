import { useEffect, useRef, useState } from "react";
import { constructMoves, constructReducer, constructPeer, destructPeer } from "./shared";
import { useStorageState } from 'react-storage-hooks';
import { v4 as uuid } from "uuid";

const connect = ({ roomId, peer, conn }) => {
  if (conn.current && conn.current.open && conn.current.peer === roomId) return;
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

const useConnection = ({ id, roomId }) => {
  const peer = useRef();
  const conn = useRef();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const onData = (data) => setData((stream) => [...stream, ...data]);
  const clearData = () => setData([]);

  useEffect(() => {
    if (!roomId) return;

    constructPeer({ peer, id })
    peer.current.on("open", () => {
      connect({ conn, peer, roomId });
      !open && setOpen(true);
      conn.current.on("data", onData);
    })

    return () => destructPeer({ peer })
  }, [id, open, roomId])

  return { conn, isOpen: open, data, clearData }
}

const usePartyGuest = ({ roomId, game }) => {
  const [id] = useStorageState(
    window.localStorage,
    `id-${roomId}`,
    uuid,
  );
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
  const { conn, isOpen, data, clearData } = useConnection({ id, roomId })
  const moves = useRef();

  useEffect(() => {
    if (!isOpen) return;
    constructMovesHandler({ conn, connectionId: id, moves, setState, roomId, game, logSize })
  }, [isOpen, conn, id, moves, setState, roomId, game, logSize])

  useEffect(() => {
    if (!isOpen || !conn.current || !data || !data.length) return;
    const events = [...data]
    console.log("events", events);
    clearData();
    ack({ conn, logSize: events[events.length - 1].index })
    increaseLogSize({ setLogSize, value: events.length });
    sync({ setState, roomId, game, events })
  }, [data, clearData, conn, game, isOpen, logSize, roomId, setLogSize, setState])

  console.log("data", data);

  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
