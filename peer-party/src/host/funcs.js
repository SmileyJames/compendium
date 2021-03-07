export const logEvent = ({ setEventLog, event, connectionId }) => {
  setEventLog(events => [...events, { ...event, connectionId }]);
}

