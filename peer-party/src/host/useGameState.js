import { useRef, useEffect } from "react";
import { useStateStore } from "./stores";
import { constructReducer } from "../shared";

const updateState = ({ roomId, setState, game, events }) => {
  const reducer = constructReducer({ game, roomId, events })
  setState(reducer);
}

const useGameState = ({ roomId, game, eventLog }) => {
  const logSize = useRef();
  const { state, setState } = useStateStore(roomId);
  useEffect(() => {
    const events = eventLog.slice(logSize.current || 0);
    if (!roomId || !game || !events.length) return;
    updateState({ roomId, setState, game, events });
    logSize.current = eventLog.length;
  }, [setState, roomId, game, eventLog, logSize])
  return { state };
}

export default useGameState
