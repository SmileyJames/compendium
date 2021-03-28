import React from "react";
import styled from "styled-components";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: inline-block;
`;

const EmojiPicker = ({
  onSelectEmoji,
  onHide
}) => {
  const onSelect = emoji => {
    onSelectEmoji(emoji.native);
  };

  return /*#__PURE__*/React.createElement(Background, {
    tabIndex: true,
    onKeyPress: onHide,
    onClick: onHide
  }, /*#__PURE__*/React.createElement(Wrapper, {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Picker, {
    onSelect: onSelect,
    set: "twitter"
  })));
};

export default EmojiPicker;