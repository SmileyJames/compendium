import { diff } from 'jsondiffpatch'
import seedrandom from 'seedrandom'
import { isRandomMove, genSeed } from '../random'
import { getMove } from '../shared'
import { isSecretMove } from '../secret'
import {
  State,
  PeerId,
  RandomNumberGenerator,
  RevealSecretFunction,
  Game,
  RandomMove,
  SecretMove,
  SimpleMove,
  RandomArgsMixin,
  SecretArgsMixin,
  RandomSecretMove
} from '..'
import { EventItem, EventList } from '../types'
import { Action } from '.'

export interface Controller {
  roomId: PeerId
  game: Game
  random: RandomNumberGenerator
  revealSecret: RevealSecretFunction
}

interface ReducerParameters {
  state: State
  contextId: PeerId
  action: Action
  controller: Controller
}

interface ReducerReturn {
  state: State
  event: EventItem
}

export function reducer({
  state,
  contextId,
  action,
  controller
}: ReducerParameters): ReducerReturn {
  const moveFn = getMove({
    move: action.move,
    connectionId: action.connectionId,
    roomId: controller.roomId,
    game: controller.game
  })
  const event: EventItem = { index: null, ...action }

  let newState: State

  const isRandom = isRandomMove(moveFn)
  const isSecret = isSecretMove(moveFn)

  if (isRandom) {
    event.seed = genSeed(controller.random)
  }

  const simpleMoveArgs = {
    state,
    roomId: controller.roomId,
    connectionId: action.connectionId,
    args: action.args
  }
  const randomMixin: RandomArgsMixin | null = isRandom
    ? { random: seedrandom(event.seed) }
    : null
  const secretMixin: SecretArgsMixin | null = isSecret
    ? { contextId, revealSecret: controller.revealSecret }
    : null

  if (randomMixin && !isSecret) {
    const randomMoveFn = moveFn as RandomMove
    newState = randomMoveFn({ ...simpleMoveArgs, ...randomMixin })
    return { state: newState, event }
  }

  if (secretMixin) {
    if (!isRandom) {
      const secretMoveFn = moveFn as SecretMove
      newState = secretMoveFn({ ...simpleMoveArgs, ...secretMixin })
    }

    if (randomMixin) {
      const randomSecretMoveFn = moveFn as RandomSecretMove
      newState = randomSecretMoveFn({
        ...simpleMoveArgs,
        ...secretMixin,
        ...randomMixin
      })
    }

    event.patch = diff(state, newState)
    return { state: newState, event }
  }

  const simpleMoveFn = moveFn as SimpleMove
  newState = simpleMoveFn(simpleMoveArgs)
  return { state: newState, event }
}

type Result = { state: State; eventLog: EventList }

interface ApplyActionsParameters {
  actions: Action[]
  contextId: PeerId
  controller: Controller
  initialState?: State
  initialEventLog?: EventList
}

export function applyActions({
  actions,
  contextId,
  controller,
  initialState = {}
}: ApplyActionsParameters): Result {
  const result = actions.reduce(
    (accumulator, action) => {
      try {
        const { state, event }: { state: State; event: EventItem } = reducer({
          state: accumulator.state,
          contextId,
          action,
          controller
        })
        const eventLog: EventList = [...accumulator.eventLog, event]
        return { state, eventLog }
      } catch (error) {
        console.error('Invalid Event', error)
        return accumulator
      }
    },
    { state: initialState, eventLog: [] as EventList }
  )
  return result
}