import React from "react";
import styled from "styled-components";
import PlayingCard, { FeltTable, Hand } from "@compendium/playing-card";
const Title = styled.h2`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
`;

const Guest = ({
  state,
  roomId,
  moves,
  connectionId
}) => {
  const isConnectedPlayer = player => player.connectionId === connectionId;

  const playerIndex = state.players.list.findIndex(isConnectedPlayer);
  const chips = state.chips[playerIndex];
  console.log("AAAHHHH", connectionId);
  return /*#__PURE__*/React.createElement(FeltTable, null, /*#__PURE__*/React.createElement("h1", null, "Chips: ", chips), /*#__PURE__*/React.createElement(Hand, null, state.hand.map(({
    suit,
    value
  }) => /*#__PURE__*/React.createElement(PlayingCard, {
    suit: suit,
    value: value
  }))));
};

export default Guest;