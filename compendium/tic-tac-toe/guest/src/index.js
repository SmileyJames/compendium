import React from "react";
import styled from "styled-components";
import { NOUGHTS, CROSSES } from "@compendium/tic-tac-toe-game";

const Button = styled.button`
  width: 33.333%;
  height: 33.333%;
  background-color: white;
  border: 2px solid red;
  color: black;
  text-align: center;
  float: left;
  box-sizing: border-box;
`;

const Tile = styled.div`
  width: 33.333%;
  height: 33.333%;
  background-color: white;
  border: 2px solid red;
  color: black;
  text-align: center;
  float: left;
  box-sizing: border-box;
`;

const Board = styled.div`
  width: 30em;
  height: 30em;
`;

const TileOrButton = ({ value, onClick }) =>
  (value === null)
    ? <Button onClick={onClick}></Button>
    : <Tile>
        {value === NOUGHTS ? "O" : null}
        {value === CROSSES ? "X" : null}
      </Tile>

const Guest = ({ state, moves }) => (
  <Board>
    {state.board && state.board.map((value, position) =>
      <TileOrButton key={position} value={value} onClick={() => moves.fillSquare({ position })} />
    )}
  </Board>
)

export default Guest;
