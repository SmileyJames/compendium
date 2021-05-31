import game from "./game";
import { Host, Guest, withGuestPlayers, withHostPlayers } from "./client";

const Players = { Host, Guest, game };

export const withPlayers = (options, { Host: OriginalHost, Guest: OriginalGuest, game: originalGame, ...rest }) => {
    const NewGuest = withGuestPlayers(OriginalGuest)
    const NewHost = withHostPlayers(options, OriginalHost)
    const newGame = { ...game, ...originalGame }
    return { Guest: NewGuest, Host: NewHost, game: newGame, ...rest  }
}

export default Players;
