import React from "react";
import { Button, Flex } from "rebass/styled-components";

const Host = ({ moves }) => {
  const onThrowPotato = () => moves.throwPotato();
  return (
    <Flex>
      <Button onClick={onThrowPotato} onKeyPress={onThrowPotato} variant='primary' mr={2}>
        Throw the Hot Potato, to your Guests!
       </Button>
    </Flex>
  );
};

export default Host;
