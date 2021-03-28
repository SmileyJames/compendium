import React from "react";
import { withGuestPlayers } from "@compendium/players-client";
import PlayingCard, { FeltTable, Hand } from "@compendium/playing-card";
const Guest = withGuestPlayers(({
  state,
  roomId,
  moves,
  connectionId
}) => {
  return /*#__PURE__*/React.createElement(FeltTable, null, /*#__PURE__*/React.createElement(Hand, null, state.hand && state.hand.map(({
    suit,
    value
  }) => /*#__PURE__*/React.createElement(PlayingCard, {
    suit: suit,
    value: value
  }))));
});
export default Guest;