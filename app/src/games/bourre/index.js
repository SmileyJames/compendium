import game from "./game";
import { Host, Guest } from "./client";
import { withPlayers } from "components/players"

const name = "Bourré";

const playersOptions = {
    minPlayers: 2,
    maxPlayers: 7,
}

const Bourre = withPlayers(playersOptions, { name, Host, Guest, game });

export default Bourre;
