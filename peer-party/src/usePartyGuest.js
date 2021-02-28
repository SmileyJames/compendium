import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { constructMoves, constructReducer, constructPeer, destructPeer } from "./shared";
// import { usePersist } from "./persist";

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
      onOpen();
      connect({ conn, peer, roomId });
      conn.current.on("data", onData);
    });

    return () => destructPeer({ peer })

  }, dependants)
}

const usePartyGuest = ({ roomId, game }) => {
  // const [state, setState] = usePersist(`guestState-${roomId}`, {});
  // const [logSize, setLogSize] = usePersist(`logSize-${roomId}`, 0);
  const [{ state, cache }, setState] = useState({ state: {}, cache: {} });
  const [logSize, setLogSize] = useState(0);
  const [id, setId] = useState("totally-rrandom...");
  const conn = useRef();

  const moves = useRef();

  console.log(logSize);

  const onOpen = () => {
    console.log("moves", moves);
    constructMovesHandler({ conn, connectionId: id, moves, setState, roomId, game, logSize })
  }
  const onData = (events) => {
    ack({ conn, logSize: logSize + events.length })
    increaseLogSize({ setLogSize, value: events.length });
    sync({ setState, roomId, game, events })
  }
  const dependants = [
   , conn, moves, roomId, setState,
    game, logSize, setLogSize, onData, onOpen
  ];
  useConnection({ conn, connectionId: id, roomId, onOpen, onData, dependants })


  return { state: cache, moves: moves.current }
}

export default usePartyGuest;
