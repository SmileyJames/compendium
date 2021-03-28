import React from "react";
import styled from "styled-components";
const Title = styled.h1`
  color: navy;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4em;
`;

const Host = ({
  state,
  roomId,
  moves,
  connections
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Title, null, "Boureewithanaccent"), /*#__PURE__*/React.createElement("p", null, state.players.maxPlayers));
};

export default Host;