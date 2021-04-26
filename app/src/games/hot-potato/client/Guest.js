import React from "react";
import { Text } from "rebass/styled-components";

const Guest = ({ state, roomId, moves, connectionId, connected }) => {
  return (
    <Text
      fontSize={[ 3, 4, 5 ]}
      fontWeight='bold'
      color='primary'
    >
      Guest
    </Text>
  );
};

export default Guest;