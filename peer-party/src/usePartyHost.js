import { useRef, useState, useEffect } from "react";
import { isString, isObject, isInteger } from "lodash";
import Peer from "peerjs";


const validateEvent = (event, validMoves) => (
  event &&
  isString(event.move) && 
  isObject(event.args) &&
  isInteger(event.index) &&
  validMoves.findIndex(event.move)
)

const usePartyHost = ({ roomId, game }) => {

  const moves = useRef();

  const peer = useRef();
  const eventLog = useRef([]);

  const connectionLogSizeMap = useRef({});

  const [state, setState] = useState({});

  useEffect(() => {

    moves.current = new Proxy({}, {
      get: (_, move) => (args) => {
        setState(o => game.hostMoves[move]({ state: o, connectionId: roomId, args }))
        eventLog.current.push({ move, args, connectionId: roomId })
      }
    });

    let timeouts = {};
    peer.current = new Peer(roomId);
    peer.current.on("connection", (conn) => {


      conn.on("data", ({ index, ...event }) => {
        // Update log sizes mapped to connection ids
        connectionLogSizeMap.current[conn.peer] = index

        if (!validateEvent(event, Object.keys(game.guestMoves))) return;

        // Add to event log
        eventLog.current.push(event);

        // Apply events to state
        setState(o =>
          game.guestMoves[event.move]({ state: o, connectionId: event.connectionId, args: event.args }),
        )
      })


      const ticker = (tick) => () => {
        tick()
        timeouts[conn.peer] = setTimeout(ticker(tick), 500)
      }

      ticker(() => {
        const numSent = connectionLogSizeMap.current[conn.peer];
        if (eventLog.current.length > numSent) {
          conn.send(eventLog.slice(numSent));
        }
      })()


    })

    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
      peer.current.destroy();
      peer.current = null;
    }
  }, [roomId, game])

    
  return { state, moves: moves.current }
}

export default usePartyHost;
