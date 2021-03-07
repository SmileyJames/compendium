import { useEffect } from "react";

const useSendSyncs = ({ connections, connectionLogSizeMap, eventLog }) => {
  useEffect(() => {
    for (const connection of connections) {
      const numSent = connectionLogSizeMap.current[connection.peer] || 0;
      if (eventLog.length > numSent) {
        const events = eventLog.slice(numSent)
          .map((e, i) => ({ ...e, index: numSent + i }));
        connection.send(events);
      }
    }
  }, [connections, connectionLogSizeMap, eventLog]);
};

export default useSendSyncs;
