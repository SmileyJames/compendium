import { useRef, useState, useEffect } from "react";
import { isString, isObject, isInteger } from "lodash";
import Peer from "peerjs";

const validateEvent = (event, validMoves) => (
  event &&
  isString(event.move) && 
  isObject(event.args) &&
  validMoves.findIndex((m) => m === event.move) > -1
)

const usePartyHost = ({ roomId, game }) => {

  const moves = useRef();

  const peer = useRef();
  const eventLog = useRef([]);

  const connectionLogSizeMap = useRef({});

  const [state, setState] = useState({});
  const [connections, setConnections] = useState([]);

  useEffect(() => {

    if (!game) return;

    moves.current = new Proxy({}, {
      get: (_, move) => (args) => {
        setState(o => game.hostMoves[move]({ state: o, connectionId: roomId, args }))
        eventLog.current.push({ move, args, connectionId: roomId })
      }
    });

    let timeouts = {};
    peer.current = new Peer(roomId);
    peer.current.on("open", () => {
      peer.current.on("connection", (conn) => {

        setConnections((conns) => [...conns, conn.peer]);
        connectionLogSizeMap.current[conn.peer] = 0

        conn.on("data", ({ index, ...event }) => {

          // Update log sizes mapped to connection ids
          if (!isInteger(index)) return;
          connectionLogSizeMap.current[conn.peer] = index

          if (!validateEvent(event, Object.keys(game.guestMoves))) return;

          // Add to event log
          eventLog.current.push({ ...event, connectionId: conn.peer });

          // Apply events to state
          setState(o => {
            try {
              return game.guestMoves[event.move]({ state: o, connectionId: conn.peer, args: event.args })
            } catch (e) {
              console.error(e);
              return o;
            }
          })
        })

        const ticker = (tick) => () => {
          tick()
          timeouts[conn.peer] = setTimeout(ticker(tick), 500)
        }

        ticker(() => {
          const numSent = connectionLogSizeMap.current[conn.peer];
          if (eventLog.current.length > numSent) {
            const evts = eventLog.current.slice(numSent);
            conn.send(evts);
          }
        })()


      })
    })

    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
      peer.current.destroy();
      peer.current = null;
    }
  }, [roomId, game])

    
  return { state, moves: moves.current, connections }
}

export default usePartyHost;
