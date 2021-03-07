import { useRef, useState, useEffect, useMemo } from "react";
import { isString, isObject, isInteger } from "lodash";
import { logEvent } from "./funcs";
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

const useConnections = ({ game, roomId, eventLog, setEventLog }) => {
  const { peer } = usePeer(roomId);
  const [connections, setConnections] = useState([]);
  const connectionLogSizeMap = useRef({});

  useEffect(() => {
    if (!peer) return;
    peer.on("connection", (conn) => {
      conn.on("open", () => {
        appendConnection({ setConnections, conn });
      });

      conn.on("data", ({ index, ...event }) => {
        if (isInteger(index)) {
          updateLogSizeMap({ conn, connectionLogSizeMap, size: index + 1 });
        }
        
        if (
          (isInteger(index) || index === null) &&
          validateEvent(event, Object.keys(game.guestMoves))
        ) {
          logEvent({ setEventLog, event, connectionId: conn.peer });
        }
      })

      conn.on("close", () => {
        removeConnection({ setConnections, conn });
      });

      conn.on("error", (error) => {
        console.error(conn.peer, error)
      });
    })

  }, [peer, game, roomId])

  return { connections, connectionLogSizeMap }
}

export default useConnections;
