import React from "react";
import styled from "styled-components";
import PlayingCard, { FeltTable, Hand } from "@compendium/playing-card";

const Title = styled.h2`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
`

const Guest = ({ state, roomId, moves, connectionId }) => {
  const isConnectedPlayer = (player) => player.connectionId === connectionId;
  const playerIndex = state.players.list.findIndex(isConnectedPlayer);
  const chips = state.chips[playerIndex];

  console.log("AAAHHHH", connectionId);

  return (
    <FeltTable>
      <h1>Chips: {chips}</h1>
      <Hand>
        {state.hand.map(({suit, value}) => (
          <PlayingCard suit={suit} value={value}/>
        ))}
      </Hand>
    </FeltTable>
  );
}

export default Guest;
