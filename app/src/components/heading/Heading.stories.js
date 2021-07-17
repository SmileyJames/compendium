import React from 'react';
import Heading from "components/heading";

export default {
  title: 'Components/Heading',
  component: Heading,
};

const Template = ({ children, ...props }) => (
  <Heading {...props} >{children}</Heading>
);
 
export const PrimaryHeadingStory = Template.bind({});
PrimaryHeadingStory.args = {
  children: "Lorem ipsum de lorum col a suld icus a puentus aleetum",
  variant: "primary",
};

export const SecondaryHeadingStory = Template.bind({});
SecondaryHeadingStory.args = {
  children: "Lorem ipsum de lorum col a suld icus a puentus aleetum",
  variant: "secondary",
};