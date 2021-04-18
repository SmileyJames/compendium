import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersist<T>(store: Storage, key: string, defaultValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    () => {
      const item = store.getItem(key);
      if (item) {
        return JSON.parse(item ?? "")
      } else {
        return (defaultValue instanceof Function) ? defaultValue() : defaultValue;
      }
    }
  );

  useEffect(() => {
    store.setItem(key, JSON.stringify(state));
  }, [key, state, store]);

  return [state, setState];
}

export default usePersist;
