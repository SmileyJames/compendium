import React from "react";
import { withGuestPlayers } from "@compendium/players-client"
import PlayingCard, { FeltTable, Hand } from "@compendium/playing-card";

const Guest = withGuestPlayers(({ state, roomId, moves, connectionId }) => {
  return (
    <FeltTable>
      <Hand>
        {state.hand && state.hand.map(({ suit, value }) => (
          <PlayingCard suit={suit} value={value}/>  
        ))}
      </Hand>
    </FeltTable>
  );
})

export default Guest;
