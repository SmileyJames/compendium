import React, { useState } from "react";
import Chessboard from "chessboardjsx"
import Chess from 'chess.js';
import { Flex, Text } from "rebass/styled-components";

const Container = ({ children }) => (
  <Flex flexDirection="column" alignItems="center" pt="1">{children}</Flex>
)

const EndGame = ({ game, isMyTurn }) => {
  let text = "";
  if (game.in_stalemate()) {
    text = "Stalemate"
  }
  if (game.in_threefold_repetition()) {
    text = "Three-fold repetition"
  }
  if (game.insufficient_material()) {
    text = "Infufficient Material"
  }
  if (game.in_checkmate()) {
    if (isMyTurn) {
      text = "Win"
    } else {
      text = "Lose"
    }
  } 
  if (game.in_draw()) {
    text = "Draw"
  }
  return (
    <Text fontSize={5} mt={2} mb={3}>{text}</Text>
  );
};

const Client = ({ orientation, state, moves }) => {
  const [validMoves, setValidMoves] = useState([]);
  const game = new Chess(state.board);
  const isGameOver = game.game_over();
  const isMyTurn = game.turn()[0] === orientation[0]

  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    setValidMoves([])
    const isMyPeice = piece[0] === orientation[0];
    if (isGameOver || !isMyPeice || !isMyTurn) return;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // invalid move
    if (move === null) return;
    moves.chessMove({ chessMove: move })
  }

  const calcWidth = ({ screenWidth, screenHeight }) => (
    Math.min(screenWidth * 0.9, screenHeight * 0.9)
  );

  const onSquareClick = (square) => {
    if (isGameOver || !isMyTurn) return;

    const move = validMoves.find(validMove => validMove.slice(-2) === square);
    if (move) {
      moves.chessMove({ chessMove: move })
      setValidMoves([])
    } else {
      const moves = game.moves({ square });
      setValidMoves(moves);
    }
  }

  const squareStyles = validMoves.reduce((o, validMove) => {
    o[validMove.slice(-2)] = {
      boxShadow: "yellow 0 0 1px 4px inset",
    };
    return o;
  }, {})

  return (
    <Container>
      {isGameOver && <EndGame isMyTurn={isMyTurn} game={game}/>}
      <Chessboard
        draggable={!isGameOver && isMyTurn}
        calcWidth={calcWidth}
        orientation={orientation}
        onDrop={onDrop}
        onDragOverSquare={() => setValidMoves([])}
        position={state.board ?? "start"}
        onSquareClick={onSquareClick}
        squareStyles={squareStyles}
      />
    </Container>
  );
};

export default Client;