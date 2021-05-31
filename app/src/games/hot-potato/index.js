import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'
import { withPlayers } from "components/players"

const name = "Hot Potato";
const theme = presetTheme;

const HotPotato = withPlayers({ maxPlayers: 16, minPlayers: 2 }, {
  name,
  theme,
  Host,
  Guest,
  game
})

export default HotPotato;
