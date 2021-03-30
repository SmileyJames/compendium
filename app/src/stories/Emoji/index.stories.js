import React from 'react';
import Emoji from "@compendium/emoji";
import styled from "styled-components";

const Icon = styled.div`
  width: 5em;
  height: 5em;
`;

export default {
  title: 'Emoji',
  component: Emoji,
};

const Template = ({ emoji }) => (
  <Icon>
    <Emoji emoji={emoji}/>
  </Icon>
);

export const Heart = Template.bind({});
Heart.args = {
  emoji: '♥️',
};

export const StickTongueOut = Template.bind({});
StickTongueOut.args = {
  emoji: '😋',
};
