import { useEffect, useRef, useState, useReducer } from "react";
import usePeer from "../usePeer";

export const connect = ({ roomId, peer, conn }) => {
  conn.current = peer.connect(roomId);
}

const useConnection = ({ id, roomId }) => {
  const conn = useRef();
  const { open, peer } = usePeer(id);
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [attempts, countAttempt] = useReducer(a => a + 1, 0);

  useEffect(() => {
    if (!open || connected) return;

    connect({ conn, peer, roomId });

    const retry = () => {
      conn.current = null;
      setConnected(false);
      countAttempt();
    }
    const timeout = setTimeout(retry, 1000);

    conn.current.on("open", () => {
      clearTimeout(timeout);
      setConnected(true); 
    });

    conn.current.on("data", (data) => {
      setData((stream) => [...stream, ...data]);
    });

    conn.current.on("close", () => {
      clearTimeout(timeout);
      retry();
    });

    conn.current.on("error", (error) => {
      console.error(error)
    });

  }, [attempts, open, connected, roomId]);

  const clearData = () => setData([]);
  return { connected: open && connected, conn, data, clearData }
}

export default useConnection;
