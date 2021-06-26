import React from 'react';
import Home from "./Home";

export default {
  title: 'App/Home',
};

const Template = (props) => (
  <Home {...props}/>
);

export const HomeStory = Template.bind({});
HomeStory.args = {
};