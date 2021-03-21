import React from 'react';
import Players from "@compendium/players";


export default {
  title: 'Players Host',
  component: Players.Host,
};

const Template = (args) => <Players.Host {...args} />;

export const EmptyState = Template.bind({});
EmptyState.args = {
  state: {},
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};

export const NoPlayers = Template.bind({});
NoPlayers.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: false,
      list: []
    }
  },
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};

export const OnePlayer = Template.bind({});
OnePlayer.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyonesIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
      ],
    },
  },
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};

export const ManyPlayers = Template.bind({});
ManyPlayers.args = {
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
    }
  },
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};

export const EveryoneIsIn = Template.bind({});
EveryoneIsIn.args = {
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
    }
  },
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};
