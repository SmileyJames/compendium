import { useEffect, useRef, useState } from "react";
import { constructMoves, constructReducer } from "./shared";
import { usePeer } from "./peer";
import { useStorageState } from "./persist";
import { v4 as uuid } from "uuid";

const connect = ({ roomId, peer, conn }) => {
  conn.current = peer.connect(roomId);
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
  const conn = useRef();
  const [data, setData] = useState([]);

  const open = usePeer(id, (peer) => {
    if (conn.current && conn.current.open && conn.current.peer === roomId) return;
    connect({ conn, peer, roomId });

    const onData = (data) => setData((stream) => [...stream, ...data]);
    conn.current.on("data", onData);

    conn.current.on("close", () => connect({ conn, peer, roomId }));
    conn.current.on("error", (error) => console.error(error));

  }, [conn, roomId]);

  const clearData = () => setData([]);
  return { conn, open, data, clearData }
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
  const { conn, open, data, clearData } = useConnection({ id, roomId })
  const moves = useRef();

  useEffect(() => {
    if (!open) return;
    constructMovesHandler({ conn, connectionId: id, moves, setState, roomId, game, logSize })
  }, [open, conn, id, moves, setState, roomId, game, logSize])

  useEffect(() => {
    if (!open || !conn.current || !data || !data.length) return;
    const events = [...data]
    console.log("events", events);
    clearData();
    ack({ conn, logSize: events[events.length - 1].index })
    increaseLogSize({ setLogSize, value: events.length });
    sync({ setState, roomId, game, events })
  }, [data, clearData, conn, game, open, logSize, roomId, setLogSize, setState])

  console.log("data", data);

  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
