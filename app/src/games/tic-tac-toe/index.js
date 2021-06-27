import game from "./game";
import { Host, Guest } from "./client";
import thumbnail from "./tic-tac-toe.jpg";

const name = "Tic Tac Toe";
const description = "a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid."
const image = { alt: "tic tac toe", src: thumbnail }

const TicTacToe = { name, description, image, Host, Guest, game };

export default TicTacToe;
