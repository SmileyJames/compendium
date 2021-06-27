import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'
import thumbnail from "./chess.jpg"

const name = "Chess";
const theme = presetTheme;

const description = "Chess is a recreational and competitive board game played between two players.";
const image = { alt: "A chess board", src: thumbnail }

const Chess = { name, theme, image, description, Host, Guest, game };

export default Chess;
