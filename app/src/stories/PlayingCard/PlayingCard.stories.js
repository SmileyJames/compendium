import React from 'react';
import PlayingCard, { ACE, KING, QUEEN, PlayingCardBack, Hand, FeltTable } from "@compendium/playing-card";


export default {
  title: 'Playing Card',
  component: PlayingCard,
};

const PlayingCardTemplate = ({ value, suit }) => <PlayingCard value={value} suit={suit} />

export const AceOfSpades = PlayingCardTemplate.bind({});
AceOfSpades.args = {
  value: ACE,
  suit: "S",
};

export const TwoOfDiamonds = PlayingCardTemplate.bind({});
TwoOfDiamonds.args = {
  value: 2,
  suit: "D",
};

const PlayingCardBackTemplate = ({ colour }) => (
  <PlayingCardBack colour={colour} />
);

export const BlueBackedCard = PlayingCardBackTemplate.bind({});
BlueBackedCard.args = {
  colour: "B",
};

export const RedBackedCard = PlayingCardBackTemplate.bind({});
RedBackedCard.args = {
  colour: "R",
};

export const ExampleHand = () => (
  <FeltTable>
    <Hand>
      <PlayingCard order={0} value={ACE} suit="H"/>
      <PlayingCard order={0} value={7} suit="D"/>
      <PlayingCard order={0} value={KING} suit="D"/>
      <PlayingCard order={2} canBeSelected={true} value={KING} suit="C"/>
      <PlayingCard order={3} canBeSelected={true} isSelected={true} selectColor="cyan" value={QUEEN} suit="S"/>
      <PlayingCard order={1} canBeSelected={true} isSelected={true} value={2} suit="H"/>
    </Hand>
  </FeltTable>
);
