import { useEffect, useState, useCallback } from "react";
import localForage from "localforage";

const mapToPersist = new Map();
const TICK_INTERVAL = 500;

const write = () => {
  for (let key of mapToPersist) {
    const value = mapToPersist.get(key);
    localForage.setItem(key, value);
    mapToPersist.delete(key);
  }
}

const read = async (key, setValue) => {
  const value = await localForage.getItem(key)
  setValue(value);
}

const usePeriodicWrite = () => {
  useEffect(() => {
    let timeout;
    const tick = () => {
      write();
      timeout = setTimeout(tick, TICK_INTERVAL);
    }
    tick()
    return () => clearTimeout(timeout);
  }, [])
}

export const usePersist = (key, d) => {
  const [value, setValue] = useState(d);
  usePeriodicWrite();

  useCallback(() => {
    read(key, setValue);
  }, [key, setValue]);

  const setter = (v) => {
    mapToPersist.set(key, v);
    setValue(v)
  }

  return [value, setter];
}
