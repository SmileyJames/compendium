import { useEffect } from "react";
import { logSizeToIndex } from "./funcs";

export const ack = ({ conn, logSize }) => {
  conn.current.send({ index: logSizeToIndex(logSize) })
}

const useAck = ({ connected, conn, logSize }) => {
  useEffect(() => {
    if (!conn.current || !connected) return;
    ack({ conn, logSize })
  }, [connected, conn, logSize]);
}

export default useAck;
