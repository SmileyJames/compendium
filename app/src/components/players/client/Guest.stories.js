import React from 'react';
import Players from "components/players";


export default {
  title: 'Components/Players/Guest',
  component: Players.Guest,
};

const Template = (args) => <Players.Guest {...args} />;

export const EmptyState = Template.bind({});
EmptyState.args = {
  state: {},
  moves: {},
  connectionId: "xxx",
  children: "Hello World",
};

export const NoPlayers = Template.bind({});
NoPlayers.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyoneIsIn: false,
      list: []
    }
  },
  moves: {},
  connectionId: "xxx",
  children: "Hello World",
};

export const OnePlayer = Template.bind({});
OnePlayer.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyoneIsIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
      ],
    },
  },
  moves: {},
  connectionId: "xxx",
  children: "Hello World",
};

export const ManyPlayers = Template.bind({});
ManyPlayers.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyoneIsIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    }
  },
  moves: {},
  connectionId: "xxx",
  children: "Hello World",
};

export const EveryoneIsIn = Template.bind({});
EveryoneIsIn.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyoneIsIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    }
  },
  moves: {},
  connectionId: "xxx",
  children: "Hello World",
};

export const Spectate = Template.bind({});
Spectate.args = {
  state: {
    players: {
      maxPlayers: 4,
      minPlayers: 4,
      everyoneIsIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: null },
        { connectionId: "xox", name: "SmoloyJimes", emoji: null },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: null },
        { connectionId: "ooo", name: "JamesSmiley", emoji: null },
      ]
    }
  },
  moves: {},
  connectionId: "aaa",
  children: "Hello World",
};
