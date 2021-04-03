import { useEffect } from "react";
import { constructReducer } from "../shared";

const sync = ({ setState, roomId, game, events }) => {
  const reducer = constructReducer({ game, roomId, events })
  setState(({ state }) => {
    const newState = reducer(state);
    return { state: newState, cache: newState }
  });
}

const updateLogSize = ({ setLogSize, events }) => {
  setLogSize(events[events.length - 1].index + 1);
}

const useSync = ({ data, clearData, game, roomId, setState, setLogSize }) => {
  useEffect(() => {
    if (!data || !data.length) return;
    const events = [...data]
    clearData();
    updateLogSize({ setLogSize, events });
    sync({ setState, roomId, game, events })
  }, [data, clearData, game, roomId, setLogSize, setState])
}

export default useSync;
