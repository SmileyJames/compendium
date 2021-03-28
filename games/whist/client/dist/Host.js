import React from "react";
import { withHostPlayers } from "@compendium/players-client";
import PlayingCard, { PlayingCardBack, FeltTable, Hand } from "@compendium/playing-card";
const Host = withHostPlayers(({
  state,
  roomId,
  moves,
  connections
}) => {
  return /*#__PURE__*/React.createElement(FeltTable, null, /*#__PURE__*/React.createElement(PlayingCardBack, {
    colour: "R"
  }), /*#__PURE__*/React.createElement(Hand, null, state.discard && state.discard.map(({
    suit,
    value
  }) => /*#__PURE__*/React.createElement(PlayingCard, {
    suit: suit,
    value: value
  }))));
});
export default Host;