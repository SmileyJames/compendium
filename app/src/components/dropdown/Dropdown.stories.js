import React from 'react';
import Dropdown from "components/dropdown";

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const Template = (props) => (
  <Dropdown {...props}/>
);

export const DropdownStory = Template.bind({});
DropdownStory.args = {
	options: ["Hello", "Goodbye", "How do you do"],
	onChange: () => {},
	value: 1,
	label: "Select a phrase",
};