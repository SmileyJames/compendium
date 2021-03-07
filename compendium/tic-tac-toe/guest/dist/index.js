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

const TileOrButton = ({
  value,
  onClick
}) => value === null ? /*#__PURE__*/React.createElement(Button, {
  onClick: onClick
}) : /*#__PURE__*/React.createElement(Tile, null, value === NOUGHTS ? "O" : null, value === CROSSES ? "X" : null);

const Guest = ({
  connected,
  state,
  moves
}) => /*#__PURE__*/React.createElement(React.Fragment, null, connected ? null : /*#__PURE__*/React.createElement("p", null, "Disconnected.."), /*#__PURE__*/React.createElement(Board, null, state.board && state.board.map((value, position) => /*#__PURE__*/React.createElement(TileOrButton, {
  key: position,
  value: value,
  onClick: () => connected && moves.current.fillSquare({
    position
  })
}))));

export default Guest;