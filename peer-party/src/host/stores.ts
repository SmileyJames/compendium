import usePersist from '../usePersist'
import { useCallback, Dispatch, SetStateAction } from 'react'
import { PeerId, State } from '..'
import { EventItem } from '../types'
import { States, EventLogs, EventLogger } from '.'

export type StateStoreSetter = Dispatch<SetStateAction<State>>

export function useStatesStore(
  roomId: PeerId
): { states: States; setState: StateStoreSetter } {
  const [states, setStates] = usePersist<States>(
    window.localStorage,
    `hostState-${roomId}`,
    {}
  )

  const setState = useCallback(
    ({ contextId, state }: { contextId: PeerId; state: State }) => {
      setStates((states) => ({ ...states, [contextId]: state }))
    },
    [setStates]
  )

  return { states, setState }
}

export function useEventLogStore(
  roomId: PeerId
): { eventLogs: EventLogs; logEvent: EventLogger } {
  const [eventLogs, setEventLogs] = usePersist<EventLogs>(
    window.localStorage,
    `eventLog-${roomId}`,
    {}
  )
  const logEvent = useCallback(
    ({ connectionId, event }: { connectionId: PeerId; event: EventItem }) => {
      setEventLogs((eventLogs) => {
        const logs = eventLogs[connectionId] || []
        return { ...eventLogs, [connectionId]: [...logs, event] }
      })
    },
    [setEventLogs]
  )
  return { eventLogs, logEvent }
}
