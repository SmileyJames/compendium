import React, { memo } from 'react';
import twemoji from 'twemoji';
const Emoji = /*#__PURE__*/memo(({
  emoji
}) => /*#__PURE__*/React.createElement("span", {
  dangerouslySetInnerHTML: {
    __html: twemoji.parse(emoji, {
      folder: 'svg',
      ext: '.svg'
    })
  }
}));
export default Emoji;