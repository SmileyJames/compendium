import { useState, useEffect } from "react";
import randomWords from "random-words";

const createConnectionId = () => randomWords({ exactly: 5 }).join('-');

const useConnectionId = () => {
  const [connectionId, setConnectionId] = useState();
  useEffect(() => {
    setConnectionId(() => createConnectionId())
  }, []);
  return connectionId;
}

export default useConnectionId;
