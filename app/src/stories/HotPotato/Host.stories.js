import React from 'react';
import HotPotato from "games/hot-potato";

export default {
  title: 'Games/Hot Potato/Host',
  component: HotPotato.Host,
};

const Template = (args) => <HotPotato.Host {...args} />;

export const MyFirstStory = Template.bind({});
MyFirstStory.args = {
  state: {},
  moves: {},
  connections: [],
};