import React from 'react';

import TicTacToe from "@compendium/tic-tac-toe";


export default {
  title: 'Tic Tac Toe Host',
  component: TicTacToe.Host,
};

const Template = (args) => <TicTacToe.Host {...args} />;

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
