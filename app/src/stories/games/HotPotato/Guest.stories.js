import React from 'react';
import HotPotato from "games/hot-potato";

export default {
  title: 'Games/Hot Potato/Guest',
  component: HotPotato.Guest,
};

const Template = (args) => <HotPotato.Guest {...args} />;

export const Potato = Template.bind({});
Potato.args = {
  state: { hotPotato: true },
  moves: { passPotato: () => {} },
  connectionId: "xxx",
  connected: true,
};

export const NoPotato = Template.bind({});
NoPotato.args = {
  state: { hotPotato: false },
  moves: {},
  connectionId: "xxx",
  connected: true,
};

export const Disconnected = Template.bind({});
Disconnected.args = {
  state: {},
  moves: {},
  connectionId: "xxx",
  connected: false,
};