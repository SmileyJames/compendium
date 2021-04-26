import React from 'react';
import HotPotato from "games/hot-potato";

export default {
  title: 'Games/Hot Potato/Guest',
  component: HotPotato.Guest,
};

const Template = (args) => <HotPotato.Guest {...args} />;

export const MyFirstStory = Template.bind({});
MyFirstStory.args = {
  state: {},
  moves: {},
  connectionId: "xxx",
};