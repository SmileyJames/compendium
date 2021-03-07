import usePersist from '../usePersist';

export const useStateStore = (roomId) => {
  const [state, setState]  = usePersist(
    window.localStorage,
    `hostState-${roomId}`,
    {}
  );
  return { state, setState }
}

export const useEventLogStore = (roomId) => {
  const [eventLog, setEventLog] = usePersist(
    window.localStorage,
    `eventLog-${roomId}`,
    []
  );
  return { eventLog, setEventLog };
}
