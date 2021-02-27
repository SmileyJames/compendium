import { useRef, useState, useEffect } from "react";
import { isString, isObject, isInteger } from "lodash";
import Peer from "peerjs";

const validateEvent = (event, validMoves) => (
  event &&
  isString(event.move) && 
  isObject(event.args) &&
  validMoves.findIndex((m) => m === event.move) > -1
)

const hasHostMove = (game, move) => Boolean(game.hostMoves[move])

const constructMovesHandler = ({ moves, game, setState, roomId, setEventLog }) => {
  moves.current = new Proxy({}, {
    get: (_, move) => (
      hasHostMove(game, move)
        ? (args) => logEvent({ setEventLog, event: { move, args }, connectionId: roomId })
        : Reflect.get(...arguments)
    )
  });
}

const constructPeer = ({ peer, roomId }) => {
  peer.current = new Peer(roomId);
}

const destructPeer = ({ peer }) => {
  peer.current.destroy();
  peer.current = null;
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
  setState(state => {
    try {
      return events.reduce(
        (o, event) => {
          const moves = (event.connectionId === roomId ? game.hostMoves : game.guestMoves);
          return moves[event.move]({ state: o, connectionId: event.connectionId, args: event.args });
        },
        state
      );
    } catch (e) {
      console.error(e);
      return state;
    }
  })
}

const useConnections = ({ game, roomId, setState, eventLog, setEventLog }) => {
  const peer = useRef();
  const [connections, setConnections] = useState([]);
  const connectionLogSizeMap = useRef({});

  useEffect(() => {
    constructPeer({ peer, roomId });
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
  }, [])

  return { eventLog, connections, connectionLogSizeMap }
}

const usePartyHost = ({ roomId, game }) => {
  const moves = useRef();
  const logSize = useRef(0);
  const [state, setState] = useState({});
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

  console.log("state", state);

  return { state, moves: moves.current, connections: connections.map(({ peer }) => peer) }
}

export default usePartyHost;
