import game from "./game";
import { Host, Guest } from "./client";
import { withPlayers } from "components/players"

const name = "Bourré";

const Bourre = withPlayers({ name, Host, Guest, game });

export default Bourre;
