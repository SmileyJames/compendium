import React from 'react';
import Bourre from "games/bourre";


export default {
  title: 'Games/Bourré/Guest',
  component: Bourre.Guest,
};

const Template = (args) => <Bourre.Guest {...args} />;

export const EmptyBoard = Template.bind({});
EmptyBoard.args = {
  state: { board: (new Array(9)).fill(null) },
  moves: {},
  connections: [1, 2],
};

export const Board = Template.bind({});
Board.args = {
  state: {
    players: {
      maxPlayers: 7,
      minPlayers: 2,
      everyoneIsIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "Max", emoji: null },
        { connectionId: "oxo", name: "Matt", emoji: null },
      ]
    },
    dealer: 0,
    chips: [4, 2, 0],
    tricks: [0, 0, 0],
    hand: [
      { value: 1, suit: "H" },
      { value: 4, suit: "D" },
      { value: 13, suit: "H" },
      { value: 8, suit: "C" },
      { value: 5, suit: "S" },
    ],
  },
  moves: {},
  connectionId: "xxx",
};
