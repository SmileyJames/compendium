import seedrandom from "seedrandom";
import { useRef, useState, useEffect, useMemo } from "react";
import { constructMoves, constructReducer } from "../shared";
import { useStateStore, useEventLogStore } from "./stores";
import useGameState from "./useGameState";
import useConnections from "./useConnections";
import useMoves from "./useMoves";
import useSendSyncs from "./useSendSyncs";


const usePartyHost = ({ roomId, game, secret }) => {
  const random = useMemo(() => seedrandom(secret || roomId), [secret, roomId]);
  const { eventLog, setEventLog } = useEventLogStore(roomId);
  const { state } = useGameState({ roomId, game, eventLog });
  const { connections, connectionLogSizeMap } = useConnections({ game, roomId, eventLog, setEventLog, random})
  const connectionIds = useMemo(() => connections.map(({ peer }) => peer), [connections])
  const { moves } = useMoves({ roomId, game, setEventLog, random });
  useSendSyncs({ connections, connectionLogSizeMap, eventLog });
  return { state, moves, connections: connectionIds }
}

export default usePartyHost;
