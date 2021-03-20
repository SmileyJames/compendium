import React, { memo } from 'react'
import twemoji from 'twemoji'

const Emoji = memo(({ emoji }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, { folder: 'svg', ext: '.svg' }),
    }}
  />
));

export default Emoji;
