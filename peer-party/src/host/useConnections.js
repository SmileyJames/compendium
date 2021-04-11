import { useRef, useState, useEffect, useMemo, useReducer } from "react";
import { isString, isObject, isInteger } from "lodash";
import usePeer from "../usePeer";

const validateEvent = (event, validMoves) => (
  event &&
  isString(event.move) && 
  isObject(event.args) &&
  validMoves.findIndex((m) => m === event.move) > -1
)

const appendConnection = ({ setConnections, conn }) => {
  setConnections((conns) => [...conns, conn]);
}

const removeConnection = ({ setConnections, conn }) => {
  setConnections((conns) => conns.filter(c => c !== conn))
}

const updateLogSizeMap = ({ conn, connectionLogSizeMap, size = 0 }) => {
  connectionLogSizeMap.current[conn.peer] = size
}

const useConnections = ({ game, roomId }) => {
  const { peer } = usePeer(roomId);
  const [connections, setConnections] = useState([]);
  const connectionLogSizeMap = useRef({});
  const [connectionIds, addConnectionId] = useReducer((state, connId) => [...state, connId], []);
  const [onGuestEvent, setOnGuestEvent] = useState(() => () => {});

  useEffect(() => {
    if (!peer || !onGuestEvent) return;

    peer.on("connection", (conn) => {
      conn.on("open", () => {
        appendConnection({ setConnections, conn });
        addConnectionId(conn.peer);
      });

      conn.on("data", ({ index, ...event }) => {
        if (isInteger(index)) {
          updateLogSizeMap({ conn, connectionLogSizeMap, size: index + 1 });
        }
        
        if (
          (isInteger(index) || index === null) &&
          validateEvent(event, Object.keys(game.guestMoves))
        ) {
          onGuestEvent({ ...event, connectionId: conn.peer });
        }
      })

      conn.on("close", () => {
        removeConnection({ setConnections, conn });
      });

      conn.on("error", (error) => {
        console.error(conn.peer, error)
      });
    })
  }, [peer, game, roomId, onGuestEvent])

  return { connections, connectionIds, connectionLogSizeMap, setOnGuestEvent }
}

export default useConnections;