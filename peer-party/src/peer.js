import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const constructPeer = ({ peer, id }) => {
  peer.current = new Peer(id);
}

const destructPeer = ({ peer }) => {
  peer.current.destroy();
  peer.current = null;
}

export const usePeer = (id, onOpen, dependants) => {
  const peer = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;

    constructPeer({ peer, id });

    peer.current.on("open", () => {
      setOpen(true)
      onOpen(peer.current)
    });

    const onConnectionClosed = () => setOpen(false);
    peer.current.on("close", onConnectionClosed);
    peer.current.on("disconnected", onConnectionClosed);
    peer.current.on("error", onConnectionClosed);

    return () => {
      destructPeer({ peer });
      clearTimeout(timeout);
    }
  }, dependants)

  return open;
}
