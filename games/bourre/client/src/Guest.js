import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
`

const Guest = ({ state, roomId, moves, connections }) => {
  return (
    <Title>Guest</Title>
  );
}

export default Guest;
