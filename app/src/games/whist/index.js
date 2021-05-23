import { withPlayers } from "components/players";
import game from "./game";
import { Host, Guest } from "./client";

const name = "Whist";

const playersOptions = { minPlayers: 4, maxPlayers: 4 }

const Whist = withPlayers(playersOptions, { name, Host, Guest, game });

export default Whist;
