import { useEffect } from "react";

const useSendSyncs = ({ connections, connectionLogSizeMap, eventLogs }) => {
  useEffect(() => {
    if (eventLogs == null) return;
    for (const connection of connections) {
      const eventLog = eventLogs[connection.peer] || [];
      const numSent = connectionLogSizeMap.current[connection.peer] || 0;
      if (eventLog.length > numSent) {
        const events = eventLog.slice(numSent)
          .map((e, i) => ({ ...e, index: numSent + i }));
        connection.send(events);
      }
    }
  }, [connections, connectionLogSizeMap, eventLogs]);
};

export default useSendSyncs;
