import React from 'react';
import TypedBanner from "components/typed-banner";

export default {
  title: 'Components/TypedBanner',
  component: TypedBanner,
};

const Template = (props) => (
  <TypedBanner {...props}/>
);

export const TypedBannerStory = Template.bind({});
TypedBannerStory.args = {
  typedSentences: [
    "Hello how are you?",
    "Hello how are the cats?",
    "Hello how are you and the cats?",
  ]
};