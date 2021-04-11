import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: navy;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4em;
`

const Host = ({ state, roomId, moves, connections }) => {
  return (
    <>
      <Title>Boureewithanaccent</Title>
      <p>{state.players.maxPlayers}</p>
    </>
  );
};

export default Host;
