import React from 'react';
import Input from "components/input";

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = (props) => (
  <Input {...props}/>
);

export const EmptyInput = Template.bind({});
EmptyInput.args = {
  label: "Enter your name",
  value: "",
  placeholder: "John Smith",
  onChange: () => {},
};

export const FilledInput = Template.bind({});
FilledInput.args = {
  label: "Enter your name",
  value: "James O'Toole",
  placeholder: "John Smith",
  onChange: () => {},
};