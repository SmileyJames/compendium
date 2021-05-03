import game from "./game";
import { Host, Guest } from "./client";
import presetTheme from '@rebass/preset'
import { withGuestPlayers, withHostPlayers }  from "components/players/client"
import Players  from "components/players"

const name = "Hot Potato";
const theme = presetTheme;

const HotPotato = { name, theme,
    Host: withHostPlayers({ maxPlayers: 16, minPlayers: 2 }, Host),
    Guest: withGuestPlayers(Guest),
    game: {
        hostMoves: {
            ...Players.game.hostMoves,
            ...game.hostMoves,
        },
        guestMoves: {
            ...Players.game.guestMoves,
            ...game.guestMoves,
        }
    }
};

export default HotPotato;
