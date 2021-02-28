import { useRef, useState, useEffect } from "react";
import { isString, isObject, isInteger } from "lodash";
import { constructMoves, constructReducer, constructPeer, destructPeer } from "./shared";
// import { usePersist } from "./persist";


const validateEvent = (event, validMoves) => (
  event &&
  isString(event.move) && 
  isObject(event.args) &&
  validMoves.findIndex((m) => m === event.move) > -1
)

const constructMovesHandler = ({ moves, game, setState, roomId, setEventLog }) => {
  const handleMove = ({ move, args }) => {
    logEvent({ setEventLog, event: { move, args }, connectionId: roomId })
  };
  constructMoves({ game, connectionId: roomId, roomId, moves, handleMove });
}

const appendConnection = ({ setConnections, conn }) => {
  setConnections((conns) => [...conns, conn]);
}

const updateLogSizeMap = ({ conn, connectionLogSizeMap, size = 0 }) => {
  connectionLogSizeMap.current[conn.peer] = size
}

const logEvent = ({ setEventLog, event, connectionId }) => {
  setEventLog(events => [...events, { ...event, connectionId }]);
}

const updateState = ({ roomId, setState, game, events }) => {
  const reducer = constructReducer({ game, roomId, events })
  setState(reducer);
}

const useConnections = ({ game, roomId, setState, eventLog, setEventLog }) => {
  const peer = useRef();
  const [connections, setConnections] = useState([]);
  const connectionLogSizeMap = useRef({});

  useEffect(() => {
    constructPeer({ peer, id: roomId });
    peer.current.on("open", () => {
      peer.current.on("connection", (conn) => {

        appendConnection({ setConnections, conn });
        updateLogSizeMap({ conn, connectionLogSizeMap });

        conn.on("data", ({ index, ...event }) => {
          if (!isInteger(index)) return;
          updateLogSizeMap({ conn, connectionLogSizeMap, size: index });

          if (!validateEvent(event, Object.keys(game.guestMoves))) return;

          logEvent({ setEventLog, event, connectionId: conn.peer })

        })
      })
    })
    return () => {
      destructPeer({ peer });
    }
  }, [game, roomId, setEventLog])

  return { eventLog, connections, connectionLogSizeMap }
}

const usePartyHost = ({ roomId, game }) => {
  const moves = useRef();
  const logSize = useRef();
  // const [state, setState]  = usePersist(`hostState-${roomId}`, {});
  // const [eventLog, setEventLog] = usePersist(`eventLog-${roomId}`, []);
  const [state, setState]  = useState({});
  const [eventLog, setEventLog] = useState([]);
  const { connections, connectionLogSizeMap } = useConnections({ game, roomId, setState, eventLog, setEventLog })

  useEffect(() => {
    if (!game) return;
    constructMovesHandler({ moves, game, setState, roomId, setEventLog });
  }, [roomId, game]);

  useEffect(() => {
    for (const connection of connections) {
      const numSent = connectionLogSizeMap.current[connection.peer];
      if (eventLog.length > numSent) {
        const events = eventLog.slice(numSent);
        connection.send(events);
      }
    }
  }, [connections, connectionLogSizeMap, eventLog]);

  useEffect(() => {
    const events = eventLog.slice(logSize.current);
    if (!roomId || !game || !events.length) return;
    updateState({ roomId, setState, game, events });
    logSize.current = eventLog.length;
  }, [roomId, game, eventLog, logSize])

  return { state, moves: moves.current, connections: connections.map(({ peer }) => peer) }
}

export default usePartyHost;
