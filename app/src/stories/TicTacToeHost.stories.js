import React from 'react';

import compendium from "@compendium/compendium";

const TicTacToeHost = compendium[0].Host;

export default {
  title: 'Tic Tac Toe Host',
  component: TicTacToeHost,
};

const Template = (args) => <TicTacToeHost {...args} />;

export const EmptyBoard = Template.bind({});
EmptyBoard.args = {
  state: { board: (new Array(9)).fill(null) },
  moves: {},
  connections: [1, 2],
};

export const Board = Template.bind({});
Board.args = {
  state: { board: [1, 2, 2, null, null, null, null, 1, 2] },
  moves: {},
  connections: [1, 2],
};
