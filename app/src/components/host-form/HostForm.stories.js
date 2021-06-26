import React from 'react';
import HostForm from "components/host-form";
import compendium from "../../compendium";

export default {
  title: 'Components/HostForm',
  component: HostForm,
};

const Template = (props) => (
  <HostForm {...props}/>
);

export const NewGameForm = Template.bind({});
NewGameForm.args = {
  compendium: compendium,
};