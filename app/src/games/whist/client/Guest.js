import React from "react";
import PlayingCard, { FeltTable, Hand } from "components/playing-card";

const Guest = ({ state, roomId, moves, connectionId }) => {
  return (
    <FeltTable>
      <Hand>
        {state.hand && state.hand.map(({ suit, value }) => (
          <PlayingCard suit={suit} value={value}/>  
        ))}
      </Hand>
    </FeltTable>
  );
}

export default Guest;
