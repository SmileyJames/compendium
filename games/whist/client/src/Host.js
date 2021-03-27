import React from "react";
import { withHostPlayers } from "@compendium/players-client"
import PlayingCard, { PlayingCardBack, FeltTable, Hand } from "@compendium/playing-card";

const Host = withHostPlayers(({ state, roomId, moves, connections }) => {
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
