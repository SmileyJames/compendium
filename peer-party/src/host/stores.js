import usePersist from '../usePersist';
import { useCallback } from 'react';

export const useStatesStore = (roomId) => {
  const [states, setStates]  = usePersist(
    window.localStorage,
    `hostState-${roomId}`,
    {}
  );

  return { states, setStates }
}

export const useEventLogStore = (roomId) => {
  const [eventLogs, setEventLogs] = usePersist(
    window.localStorage,
    `eventLog-${roomId}`,
    {}
  );
  const logEvent = useCallback(({ connectionId, event }) => {
    setEventLogs((eventLogs) => {
      const logs = eventLogs[connectionId] || [];
      return { ...eventLogs, [connectionId]: [...logs, event] };
    });
  }, []);
  return { eventLogs, logEvent };
}
