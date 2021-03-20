import React from 'react';
import PlayingCard from "@compendium/playing-card";


export default {
  title: 'Playing Card',
  component: PlayingCard,
};

const Template = (args) => <PlayingCard {...args} />;

export const PlayingCardStory = Template.bind({});
PlayingCardStory.args = {
  children: "Hello world",
};
