
import React from "react";
import Chessboard from "chessboardjsx"
import Chess from 'chess.js';
import { Flex } from "rebass/styled-components";

const Client = ({ orientation, state, moves }) => {
  const game = new Chess(state.board);

  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    // not our peice
    if (piece[0] !== orientation[0]) return null;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // invalid move
    if (move === null) return;

    moves.chessMove({ chessMove: move })
  }

  return (
    <Flex justifyContent="center" p={4}>
        <Chessboard orientation={orientation} onDrop={onDrop} position={state.board ?? "start"} />
    </Flex>
  );
};

export default Client;