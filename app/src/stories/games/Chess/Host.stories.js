import React from 'react';
import Chess from "games/chess";

export default {
  title: 'Games/Chess/Host',
  component: Chess.Host,
};

const Template = (args) => <Chess.Host {...args} />;

export const MyFirstStory = Template.bind({});
MyFirstStory.args = {
  state: {},
  moves: {},
  connections: [],
};