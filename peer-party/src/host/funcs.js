import { isRandomMove } from "../random";
import { getMove } from "../shared";


const genSeed = (random) => random()

export const logEvent = ({ setEventLog, event, connectionId, roomId, game, random }) => {

  setEventLog(events => [...events, e]);
};