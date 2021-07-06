import React from 'react';
import { PrimaryHeader, SecondaryHeader } from "components/heading";

export default {
  title: 'Components/Heading',
};

export const PrimaryHeadingStory = (props) => <PrimaryHeader {...props} />
PrimaryHeadingStory.args = {
  children: "Lorem ipsum de lorum col a suld icus a puentus aleetum",
};

export const SecondaryHeadingStory = (props) => <SecondaryHeader {...props} />
SecondaryHeadingStory.args = {
  children: "Lorem ipsum de lorum col a suld icus a puentus aleetum",
};