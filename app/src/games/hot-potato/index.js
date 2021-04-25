import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'

const name = "Hot Potato";
const theme = presetTheme;

const HotPotato = { name, theme, Host, Guest, game };

export default HotPotato;
