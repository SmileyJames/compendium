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
  connectionId: "xxx",
};

export const TwoPlayers = Template.bind({});
TwoPlayers.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
      ]
    }
  },
  moves: {},
  connectionId: "aaa",
};

export const FourPlayers = Template.bind({});
FourPlayers.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    },
  },
  moves: {},
  connectionId: "xxx",
};

export const GameStarted = Template.bind({});
GameStarted.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    },
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
  connectionId: "xxx",
};

export const FirstTurn = Template.bind({});
FirstTurn.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    },
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
  connectionId: "xxx",
};

export const LateGame = Template.bind({});
LateGame.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    },
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
  connectionId: "xxx",
};
