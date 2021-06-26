import React from 'react';
import JoinForm from "components/join-form";

export default {
  title: 'Components/JoinForm',
  component: JoinForm,
};

const Template = (props) => (
  <JoinForm {...props}/>
);

export const JoinAGameForm = Template.bind({});
JoinAGameForm.args = {
};