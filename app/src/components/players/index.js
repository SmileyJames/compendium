import game from "./game";
import { Host, Guest, withGuestPlayers, withHostPlayers } from "./client";

const Players = { Host, Guest, game };

export const withPlayers = ({ Host: OriginalHost, Guest: OriginalGuest, game: originalGame, ...rest }) => {
    const NewGuest = withGuestPlayers(OriginalGuest)
    const NewHost = withHostPlayers(OriginalHost)
    const newGame = {
        guestMoves: {
            ...game.guestMoves,
            ...originalGame.guestMoves
        },
        hostMoves: {
            ...game.hostMoves,
            ...originalGame.hostMoves
        }
    }
    return { Guest: NewGuest, Host: NewHost, game: newGame, ...rest  }
}

export default Players;
