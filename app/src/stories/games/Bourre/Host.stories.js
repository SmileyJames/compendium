import React from 'react';
import Bourre from "games/bourre";


export default {
  title: 'Games/Bourré/Host',
  component: Bourre.Host,
};

const Template = (args) => <Bourre.Host {...args} />;

export const EmptyBoard = Template.bind({});
EmptyBoard.args = {
  state: { board: (new Array(9)).fill(null) },
  moves: {},
  connections: [1, 2],
};

export const Board = Template.bind({});
Board.args = {
  state: { board: (new Array(9)).fill(1) },
  moves: {},
  connections: [1, 2],
};
