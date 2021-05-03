import { useCallback, useEffect, useMemo } from 'react'
import { StateStoreSetter, useStatesStore } from './stores'
import { EventLogs, EventLogger, Inputer, Action, States } from '.'
import { State, PeerId, RandomNumberGenerator, Game } from '..'
import { applyActions, Controller } from './funcs'

interface UseGameStateParameters {
  roomId: PeerId
  game: Game
  random: RandomNumberGenerator
  connectionIds: PeerId[]
  eventLogs: EventLogs
  logEvent: EventLogger
}

interface UseGameStateReturn {
  state: State
  input: Inputer
}

interface InternalGameStateHookParameters {
  setState: StateStoreSetter
  connectionIds: PeerId[]
  controller: Controller
  states: States
  eventLogs: EventLogs
  logEvent: EventLogger
}

function useInputCallback(params: InternalGameStateHookParameters): Inputer {
  return useCallback(
    (action: Action) => {
      const contextIds = [...params.connectionIds, params.controller.roomId]
      for (const contextId of contextIds) {
        const result = applyActions({
          initialState: params.states[contextId],
          actions: [action],
          controller: params.controller,
          contextId
        })

        result.eventLog.forEach((event) =>
          params.logEvent({ connectionId: contextId, event })
        )
        params.setState({ contextId, state: result.state })
      }
    },
    [params]
  )
}

function useNewConnectionEffect(params: InternalGameStateHookParameters): void {
  useEffect(() => {
    const [newConnection] = params.connectionIds.filter(
      (peer) => !params.states[peer] && !params.eventLogs[peer]?.length
    )
    if (!newConnection) return

    const hostEvents =
      params.eventLogs[params.controller.roomId] ?? ([] as Action[])

    const result = applyActions({
      actions: hostEvents as Action[],
      controller: params.controller,
      contextId: newConnection
    })

    result.eventLog.forEach((event) =>
      params.logEvent({ connectionId: newConnection, event })
    )
    params.setState({ contextId: newConnection, state: result.state })
  }, [params])
}

function useGameState({
  roomId,
  game,
  random,
  connectionIds,
  eventLogs,
  logEvent
}: UseGameStateParameters): UseGameStateReturn {
  const { states, setState } = useStatesStore(roomId)

  const params = useMemo(() => {
    const revealSecret = (id: PeerId, fn: (s: State) => State) => fn(states[id])
    const controller = { roomId, game, random, revealSecret }
    return { logEvent, setState, connectionIds, controller, states, eventLogs }
  }, [
    states,
    eventLogs,
    roomId,
    game,
    random,
    logEvent,
    setState,
    connectionIds
  ])

  useNewConnectionEffect(params)
  const input = useInputCallback(params)
  const hostState = useMemo(() => states[roomId] || {}, [roomId, states])

  return { state: hostState, input }
}

export default useGameState
