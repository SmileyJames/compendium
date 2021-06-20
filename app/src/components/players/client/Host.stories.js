import React from 'react';
import Players from "components/players";


export default {
  title: 'Components/Players/Host',
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
      everyoneIsIn: false,
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
      everyoneIsIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: "🍆" },
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
      everyoneIsIn: false,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: "🍆" },
        { connectionId: "xox", name: "SmoloyJimes", emoji: "🚗" },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: "🧘" },
        { connectionId: "ooo", name: "JamesSmiley", emoji: "😍" },
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
      everyoneIsIn: true,
      list: [
        { connectionId: "xxx", name: "SmileyJames", emoji: "🍆" },
        { connectionId: "xox", name: "SmoloyJimes", emoji: "🚗" },
        { connectionId: "oxo", name: "SmaliyJomes", emoji: "🧘" },
        { connectionId: "ooo", name: "JamesSmiley", emoji: "😍" },
      ]
    }
  },
  moves: {},
  connections: ["xxx", "xox", "oxo", "ooo"],
  children: "Hello World",
};
