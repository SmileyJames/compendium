import React from 'react';
import Paragraph from "components/paragraph";

export default {
  title: 'Components/Paragraph',
  component: Paragraph,
};

const ParagraphTemplate = (props) => <Paragraph {...props} />

export const ParagraphStory = ParagraphTemplate.bind({});
ParagraphStory.args = {
  children: "Lorem ipsum de lorum col a suld icus a puentus aleetum",
};
