import { useEffect, useRef, useState, useReducer } from "react";
import Peer from "peerjs";

const destructPeer = ({ setPeer }) => {
  setPeer(peer => {
    peer && peer.destroy();
    return null
  })
};

export const usePeer = (id) => {
  const [peer, setPeer] = useState();
  const [open, setOpen] = useState(false);
  const [attempts, countAttempt] = useReducer(a => a + 1, 0);

  useEffect(() => {
    if (open) return;

    const peer = new Peer(id);
    setPeer(peer);

    const retry = () => {
      setOpen(false);
      destructPeer({ setPeer });
      countAttempt();
    };

    let timeout = setTimeout(retry, 1000);

    peer.on("open", () => {
      clearTimeout(timeout);
      setOpen(true);
    });

    const onConnectionClosed = () => {
      clearTimeout(timeout);
      timeout = setTimeout(retry, 1000);
    }
    peer.on("close", onConnectionClosed);
    peer.on("disconnected", onConnectionClosed);
    peer.on("error", onConnectionClosed);

    return () => {
      destructPeer({ setPeer });
      clearTimeout(timeout);
    }
  }, [attempts, id])

  return { open, peer }
}
