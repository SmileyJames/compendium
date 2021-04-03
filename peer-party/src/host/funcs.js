import { isRandomMove } from "../random";
import { getMove } from "../shared";


const genSeed = (random) => random()

export const logEvent = ({ setEventLog, event, connectionId, roomId, game, random }) => {
  const moveFn = getMove({ connectionId, roomId, game, move: event.move })
  const e = (
    isRandomMove(moveFn)
      ? { ...event, connectionId, seed: genSeed(random) }
      : { ...event, connectionId }
  )
  setEventLog(events => [...events, e]);
};