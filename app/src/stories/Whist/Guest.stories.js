import React from 'react';
import Whist from "@compendium/whist";


export default {
  title: 'Whist Guest',
  component: Whist.Guest,
};

const Template = (args) => <Whist.Guest {...args} />;

export const Beginning = Template.bind({});
Beginning.args = {
  state: {},
  moves: {},
  connectionId: 2,
};

export const TwoPlayers = Template.bind({});
TwoPlayers.args = {
  state: {
    players: [
      { connectionId: 1, name: "SmileyJames" },
      { connectionId: 2, name: "Max" },
    ],
  },
  moves: {},
  connectionId: 2,
};

export const FourPlayers = Template.bind({});
FourPlayers.args = {
  state: {
    players: [
      { connectionId: 1, name: "SmileyJames" },
      { connectionId: 2, name: "Max" },
      { connectionId: 5, name: "Bill" },
      { connectionId: 6, name: "Bob" },
    ],
  },
  moves: {},
  connectionId: 2,
};

export const GameStarted = Template.bind({});
GameStarted.args = {
  state: {
    players: [
      { connectionId: 1, name: "SmileyJames" },
      { connectionId: 2, name: "Max" },
      { connectionId: 5, name: "Bill" },
      { connectionId: 6, name: "Bob" },
    ],
    trick: 0,
    turn: 0,
    wonLastTrick: null,
    scores: [0, 0, 0, 0],
    trumpCard: { value: 3, suit: "D" },
    discard: [],
    hand: [
      { value: 1, suit: "H" },
      { value: 2, suit: "H" },
      { value: 3, suit: "H" },
      { value: 4, suit: "D" },
      { value: 5, suit: "D" },
      { value: 6, suit: "D" },
      { value: 7, suit: "S" },
      { value: 8, suit: "S" },
      { value: 9, suit: "S" },
      { value: 10, suit: "C" },
      { value: 11, suit: "C" },
      { value: 12, suit: "C" },
      { value: 13, suit: "C" },
    ],
  },
  moves: {},
  connectionId: 2,
};

export const FirstTurn = Template.bind({});
FirstTurn.args = {
  state: {
    players: [
      { connectionId: 1, name: "SmileyJames" },
      { connectionId: 2, name: "Max" },
      { connectionId: 5, name: "Bill" },
      { connectionId: 6, name: "Bob" },
    ],
    trick: 0,
    turn: 1, wonLastTrick: null,
    scores: [0, 0, 0, 0],
    trumpCard: { value: 3, suit: "D" },
    discard: [
      { value: 1, suit: "H" },
    ],
    hand: [
      { value: 2, suit: "H" },
      { value: 3, suit: "H" },
      { value: 4, suit: "D" },
      { value: 5, suit: "D" },
      { value: 6, suit: "D" },
      { value: 7, suit: "S" },
      { value: 8, suit: "S" },
      { value: 9, suit: "S" },
      { value: 10, suit: "C" },
      { value: 11, suit: "C" },
      { value: 12, suit: "C" },
      { value: 13, suit: "C" },
    ],
  },
  moves: {},
  connectionId: 2,
};

export const LateGame = Template.bind({});
LateGame.args = {
  state: {
    players: [
      { connectionId: 1, name: "SmileyJames" },
      { connectionId: 2, name: "Max" },
      { connectionId: 5, name: "Bill" },
      { connectionId: 6, name: "Bob" },
    ],
    trick: 10,
    turn: 42,
    wonLastTrick: 1, // player index 1: Max
    scores: [4, 3, 3, 0],
    trumpCard: { value: 3, suit: "D" },
    discard: [
      { value: 1, suit: "H" },
      { value: 2, suit: "H" },
      { value: 3, suit: "H" },
      { value: 4, suit: "D" },
    ],
    hand: [
      { value: 2, suit: "H" },
      { value: 3, suit: "H" },
      { value: 4, suit: "D" },
      { value: 5, suit: "D" },
      { value: 6, suit: "D" },
      { value: 7, suit: "S" },
      { value: 8, suit: "S" },
      { value: 9, suit: "S" },
      { value: 10, suit: "C" },
      { value: 11, suit: "C" },
      { value: 12, suit: "C" },
      { value: 13, suit: "C" },
    ],
  },
  moves: {},
  connectionId: 2,
};
