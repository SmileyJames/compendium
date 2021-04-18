import usePersist from "../usePersist";
import { v4 as uuid } from "uuid";
import { PeerId, State } from "..";
import { CacheAndState, CacheAndStateSetter } from ".";
import { LogSize } from "..";
import { Dispatch, SetStateAction } from "react";

export function useIdStore(roomId: PeerId): { id: PeerId } {
  const [id] = usePersist<PeerId>(
    window.localStorage,
    `id-${roomId}`,
    uuid,
  );
  return { id };
}

type UseStateStoreReturn = { cache: State, setState: CacheAndStateSetter };
export function useStateStore(roomId: PeerId): UseStateStoreReturn {
  const [{ cache }, setState] = usePersist<CacheAndState>(
    window.localStorage,
    `guestState-${roomId}`,
    { state: {}, cache: {} }
  );
  return { cache, setState };
}

type UseLogSizeStoreReturn = { logSize: LogSize, setLogSize: Dispatch<SetStateAction<LogSize>> };
export function useLogSizeStore(roomId: PeerId): UseLogSizeStoreReturn {
  const [logSize, setLogSize] = usePersist<number>(
    window.localStorage,
    `logSize-${roomId}`,
    0
  );
  return { logSize, setLogSize };
}
