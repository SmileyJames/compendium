import { withPlayers } from "components/players";
import game from "./game";
import { Host, Guest } from "./client";
import thumbnail from "./whist.jpg";

const name = "Whist";
const description = "Whist is a classic English trick-taking card game which was widely played in the 18th and 19th centuries."
const image = { alt: "whist game", src: thumbnail }

const playersOptions = { minPlayers: 4, maxPlayers: 4 }

const Whist = withPlayers(playersOptions, { name, description, image, Host, Guest, game });

export default Whist;
