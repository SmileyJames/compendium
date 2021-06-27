import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'
import { withPlayers } from "components/players"
import thumbnail from "./hot-potato.jpg"

const name = "Hot Potato";
const theme = presetTheme;

const description = "Pass the potato to your friends."
const image = { alt: "A potato", src: thumbnail }

const HotPotato = withPlayers({ maxPlayers: 16, minPlayers: 2 }, {
  name,
  description,
  image,
  theme,
  Host,
  Guest,
  game
})

export default HotPotato;
