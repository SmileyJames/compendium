import React from 'react';
import { CardBack } from "@compendium/playing-card";


export default {
  title: 'Back of Playing Card',
  component: CardBack,
};

const Template = ({ colour }) => <CardBack colour={colour} />

export const BlueBackedCard = Template.bind({});
BlueBackedCard.args = {
  colour: "B",
};

export const RedBackedCard = Template.bind({});
RedBackedCard.args = {
  colour: "R",
};
