import React from "react";
import Client from "./Client";
import { Flex, Text } from "rebass/styled-components";

const Host = (props) => {
  if (props.connections.length < 1) {
    return (
      <Flex justifyContent="center" p={4}>
        <Text fontSize={4}>Join: <span>{props.roomId}</span></Text>
      </Flex>
    )
  }

  return (
    <Client orientation="black" {...props} />
  );
};

export default Host;