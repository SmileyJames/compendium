import { useState, useEffect } from "react";

const usePersist = (store, key, defaultValue) => {
  const [state, setState] = useState(
    () => (
      JSON.parse(store.getItem(key)) || 
      ((defaultValue instanceof Function) ? defaultValue() : defaultValue)
    )
  );

  useEffect(() => {
    store.setItem(key, JSON.stringify(state));
  }, [key, state, store]);

  return [state, setState];
}

export default usePersist;
