import React from "react";
import { withHostPlayers } from "components/players/client"
import PlayingCard, { PlayingCardBack, FeltTable, Hand } from "components/playing-card";

const Host = withHostPlayers({ maxPlayers: 4, minPlayers: 4 }, ({ state, roomId, moves, connections }) => {
  return (
    <FeltTable>
      <PlayingCardBack colour="R"/>
      <Hand>
        {state.discard && state.discard.map(({ suit, value }) => (
          <PlayingCard suit={suit} value={value}/>  
        ))}
      </Hand>
    </FeltTable>
  );
})

export default Host;
