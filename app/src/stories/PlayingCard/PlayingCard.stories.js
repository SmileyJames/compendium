import React from 'react';
import PlayingCard, { ACE } from "@compendium/playing-card";


export default {
  title: 'Playing Card',
  component: PlayingCard,
};

const Template = ({ value, suit }) => <PlayingCard value={value} suit={suit} />

export const AceOfSpades = Template.bind({});
AceOfSpades.args = {
  value: ACE,
  suit: "S",
};
