import React from 'react';
import CallToActionCard from "components/cta-card";

export default {
  title: 'Components/CallToActionCard',
  component: CallToActionCard,
};

const imageAlt = "React code";
const imageSrc = "https://via.placeholder.com/600x400";
const headerText = "Hello world";
const bodyText = "Lorem ipsum delorem a bit a sundo mundo wondom. El du darious oh fohlm du tousch.";
const buttonLabel = "Call to Action"

const Template = (props) => (
  <CallToActionCard {...props}/>
);

export const SmallCard = Template.bind({});
SmallCard.args = {
  size: 1,
  imageSrc,
  imageAlt,
  bodyText,
  headerText,
  buttonLabel,
};

export const BigCard = Template.bind({});
BigCard.args = {
  size: 2,
  imageSrc,
  imageAlt,
  bodyText,
  headerText,
  buttonLabel,
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.args = {
  variant: "secondary",
  imageSrc,
  imageAlt,
  bodyText,
  headerText,
  buttonLabel,
};