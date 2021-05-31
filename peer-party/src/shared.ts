import has from 'lodash/has'
import { Game, Args, Moves } from '.'
import { MoveHandler } from './types'

interface ConstructMovesArgs {
  game: Game
  handleMove: MoveHandler
}

export function constructMoves({
  game,
  handleMove
}: ConstructMovesArgs): Moves {
  return new Proxy(
    {},
    {
      get: (target, key, receiver) => {
        if (has(game, key)) {
          return (args: Args) => handleMove({ move: key.toString(), args })
        } else if (key === Symbol.iterator && game) {
          return Object.keys(game)[Symbol.iterator].bind(target)
        } else {
          return Reflect.get(target, key, receiver)
        }
      }
    }
  )
}
