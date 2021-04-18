import usePersist from '../usePersist';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { PeerId, EventItem } from ".."; 
import { States, EventLogs, EventLogger } from '.';

export function useStatesStore(roomId: PeerId): { states: States, setStates: Dispatch<SetStateAction<States>> } {
  const [states, setStates]  = usePersist<States>(
    window.localStorage,
    `hostState-${roomId}`,
    {}
  );

  return { states, setStates }
}

export function useEventLogStore(roomId: PeerId): { eventLogs: EventLogs, logEvent: EventLogger } {
  const [eventLogs, setEventLogs] = usePersist<EventLogs>(
    window.localStorage,
    `eventLog-${roomId}`,
    {}
  );
  const logEvent = useCallback(({ connectionId, event }: { connectionId: PeerId, event: EventItem }) => {
    setEventLogs((eventLogs) => {
      const logs = eventLogs[connectionId] || [];
      return { ...eventLogs, [connectionId]: [...logs, event] };
    });
  }, [setEventLogs]);
  return { eventLogs, logEvent };
}
