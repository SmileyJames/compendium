import { useMemo } from 'react'
import uniq from 'lodash/uniq'
import { useEventLogStore } from './stores'
import useGameState from './useGameState'
import useConnections from './useConnections'
import useMoves from './useMoves'
import useSendSyncs from './useSendSyncs'
import useInputBuffer from './useInputBuffer'
import useRandom from './useRandom'
import { Connection } from '../types'
import { UsePartyHostArgs, UsePartyHostReturn } from '..'

/**
 * A React hook that, provided the game rules and a shared room identifier,
 * returns the host's state representation and an object with moves
 * to call on the host's user action.
 */
function usePartyHost({
  roomId,
  game,
  secret
}: UsePartyHostArgs): UsePartyHostReturn {
  // The host will need to make some random decisions
  const random = useRandom({ secret, roomId })

  // The event log will store validated events, so we can sync guests.
  const { eventLogs, logEvent } = useEventLogStore(roomId)

  // Guests connect and send (not trusted) events.
  // The host remembers the last event a guest has acknowledged receiving a sync for.
  const {
    setOnGuestEvent,
    connections,
    connectionIds,
    connectionLogSizeMap
  } = useConnections({ game, roomId })

  // The host creates events also
  const { setOnHostEvent, moves } = useMoves({ roomId, game })

  // When an event takes places, applies it to a state for each connection, to check it is a valid move.
  // If no error is thrown it is a valid move, then the state is updated and the valid event is logged.
  const { state, input } = useGameState({
    roomId,
    game,
    logEvent,
    random,
    connectionIds,
    eventLogs
  })

  // Connect yet-to-be-validated guest and host events to the event handler
  useInputBuffer({ setOnHostEvent, setOnGuestEvent, input })

  // Update active connections with valid events in the log they have yet to acknowledge.
  useSendSyncs({ connections, connectionLogSizeMap, eventLogs })

  const activeConnectionIds = useMemo(
    () => uniq(connections.map((conn: Connection) => conn.peer)).sort(),
    [connections]
  )

  return { state, moves, connections: activeConnectionIds }
}

export default usePartyHost
