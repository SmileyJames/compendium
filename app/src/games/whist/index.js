import { withPlayers } from "components/players";
import game from "./game";
import { Host, Guest } from "./client";

const name = "Whist";

const Whist = withPlayers({ name, Host, Guest, game });

export default Whist;
