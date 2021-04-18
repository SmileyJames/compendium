import { useEffect } from "react";
import { constructReducer } from "./funcs";
import { Game, EventList, PeerId } from "..";
import { CacheAndStateSetter, LogSizeSetter } from ".";

type SyncArgs = { setState: CacheAndStateSetter, roomId: PeerId, game: Game, events: EventList }
const sync = ({ setState, roomId, game, events }: SyncArgs) => {
  const reducer = constructReducer({ game, roomId, events })
  setState(({ state }) => {
    const newState = reducer(state);
    return { state: newState, cache: newState }
  });
}

type UpdateLogSizeArgs = { setLogSize: LogSizeSetter, events: EventList };
const updateLogSize = ({ setLogSize, events }: UpdateLogSizeArgs) => {
  setLogSize((events[events.length - 1].index ?? 0) + 1);
}

type UseSyncArgs = {
  data: EventList,
  clearData: () => void,
  game: Game,
  roomId: PeerId,
  setState: CacheAndStateSetter,
  setLogSize: LogSizeSetter,
}
function useSync({ data, clearData, game, roomId, setState, setLogSize }: UseSyncArgs): void {
  useEffect(() => {
    if (!data || !data.length) return;
    const events = [...data]
    clearData();
    updateLogSize({ setLogSize, events });
    sync({ setState, roomId, game, events })
  }, [data, clearData, game, roomId, setLogSize, setState])
}

export default useSync;
