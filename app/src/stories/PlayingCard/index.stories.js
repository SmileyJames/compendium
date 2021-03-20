import React from 'react';
import PlayingCard from "@compendium/playing-card";


export default {
  title: 'Playing Card',
  component: PlayingCard,
};

const Template = ({ value, suit }) => <PlayingCard value={value} suit={suit} />

export const PlayingCardStory = Template.bind({});
PlayingCardStory.args = {
  value: 3,
  suit: "H",
};
