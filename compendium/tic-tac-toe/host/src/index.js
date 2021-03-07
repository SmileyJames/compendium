import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NOUGHTS, CROSSES } from "@compendium/tic-tac-toe-game";

const Tile = styled.div`
  width: 33.333%;
  height: 33.333%;
  background-color: cyan;
  border: 2px solid yellow;
  color: black;
  text-align: center;
  float: left;
  box-sizing: border-box;
`;

const Board = styled.div`
  width: 30em;
  height: 30em;
`;

const Host = ({ state, roomId, moves, connections }) => {
  useEffect(() => {
    if (!state.board && connections.length >= 2) {
      const [crossesConnId, noughtsConnId] = connections;
      moves.current.startGame({ crossesConnId, noughtsConnId });
    }
  }, [connections])

  return (
    <>
      {connections.length < 2 && (
        <Link to={`/guest/${roomId}`}>
          {window.location.host}#/guest/{roomId}
        </Link>
      )}
      <Board>
        {state.board && state.board.map((value, position) => (
          <Tile key={position}>
            {value === NOUGHTS ? "O" : null}
            {value === CROSSES ? "X" : null}
          </Tile>
        ))}
      </Board>
    </>
  );
}

export default Host;
