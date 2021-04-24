import seedrandom, { State } from 'seedrandom'
import { patch } from 'jsondiffpatch'
import { getMove } from '../shared'
import { isRandomMove } from '../random'
import { isSecretMove } from '../secret'
import { Game, SimpleMoveArgs, RandomMove, SimpleMove, PeerId } from '..'
import { EventList, LogSize, Index } from '../types'

export function logSizeToIndex(logSize: LogSize): Index {
  const index = logSize - 1
  return index < 0 ? null : index
}

export const constructReducer = ({
  game,
  events,
  roomId
}: {
  game: Game
  events: EventList
  roomId: PeerId
}) => (state: State) => {
  try {
    return events.reduce((o, event) => {
      const moveFn = getMove({
        connectionId: event.connectionId,
        roomId,
        game,
        move: event.move
      })

      if (isSecretMove(moveFn)) {
        if (event.patch == null) {
          throw new Error('Secret moves require a state patch from the host')
        }
        patch(o, event.patch)
        return o
      }

      const moveArgs: SimpleMoveArgs = {
        state: o,
        roomId,
        connectionId: event.connectionId,
        args: event.args
      }

      if (isRandomMove(moveFn)) {
        if (event.seed == null) {
          throw new Error('Random moves require a seed from the host')
        }
        const random = seedrandom(event.seed)
        const randomMoveFn = moveFn as RandomMove
        return randomMoveFn({ ...moveArgs, random })
      }

      const simpleMoveFn = moveFn as SimpleMove
      return simpleMoveFn(moveArgs)
    }, state)
  } catch (e) {
    console.error(e)
    return state
  }
}
