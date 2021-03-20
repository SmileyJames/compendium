import { isSecretMove } from "../shared";

const genSeed = (random) => random()

export const logEvent = ({ setEventLog, event, connectionId, roomId, game, random }) => {
  const e = (
    (isSecretMove({ connectionId, roomId, game, move: event.move }))
      ? { ...event, connectionId, seed: genSeed(random) }
      : { ...event, connectionId }
  )
  setEventLog(events => [...events, e]);
}

