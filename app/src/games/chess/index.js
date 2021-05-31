import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'

const name = "Chess";
const theme = presetTheme;

const Chess = { name, theme, Host, Guest, game };

export default Chess;
