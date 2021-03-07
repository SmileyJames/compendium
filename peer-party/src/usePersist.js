import { useState, useEffect } from "react";

const usePersist = (store, key, defaultValue) => {
  const [state, setState] = useState(
    () => (
      JSON.parse(store.getItem(key)) || 
      ((defaultValue instanceof Function) ? defaultValue() : defaultValue)
    )
  );

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    store.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersist;
