import React from 'react';
import Chess from "games/chess";

export default {
  title: 'Games/Chess/Guest',
  component: Chess.Guest,
};

const Template = (args) => <Chess.Guest {...args} />;

export const MyFirstStory = Template.bind({});
MyFirstStory.args = {
  state: {},
  moves: {},
  connectionId: "xxx",
};