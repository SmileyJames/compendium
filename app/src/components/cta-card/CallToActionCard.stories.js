import React from 'react';
import CallToActionCard from "components/cta-card";

export default {
  title: 'Components/CallToActionCard',
  component: CallToActionCard,
};

const imageAlt = "React code";
const imageSrc = "https://via.placeholder.com/600x400";
const headingText = "Hello world";
const bodyText = "Lorem ipsum delorem a bit a sundo mundo wondom. El du darious oh fohlm du tousch.";
const buttonLabel = "Call to Action"

const Template = (props) => (
  <CallToActionCard {...props}/>
);

export const PrimaryCard = Template.bind({});
PrimaryCard.args = {
  variant: "primary",
  imageSrc,
  imageAlt,
  bodyText,
  headingText,
  buttonLabel,
};

export const SecondaryCard = Template.bind({});
SecondaryCard.args = {
  variant: "secondary",
  imageSrc,
  imageAlt,
  bodyText,
  headingText,
  buttonLabel,
};