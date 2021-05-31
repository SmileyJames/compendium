import React from 'react';
import Chess from "games/chess";

export default {
  title: 'Games/Chess/Host',
  component: Chess.Host,
};

const Template = (args) => <Chess.Host {...args} />;

export const Join = Template.bind({});
Join.args = {
  state: {},
  moves: {},
  roomId: "hello-world",
  connections: [],
};

export const Start = Template.bind({});
Start.args = {
  state: {},
  moves: {},
  roomId: "hello-world",
  connections: ["freind"],
};