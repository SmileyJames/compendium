import usePersist from "../usePersist";
import { v4 as uuid } from "uuid";

export const useIdStore = (roomId) => {
  const [id] = usePersist(
    window.localStorage,
    `id-${roomId}`,
    uuid,
  );
  return { id };
}

export const useStateStore = (roomId) => {
  const [{ cache }, setState] = usePersist(
    window.localStorage,
    `guestState-${roomId}`,
    { state: {}, cache: {} }
  );
  return { cache, setState };
}

export const useLogSizeStore = (roomId) => {
  const [logSize, setLogSize] = usePersist(
    window.localStorage,
    `logSize-${roomId}`,
    0
  );
  return { logSize, setLogSize };
}
