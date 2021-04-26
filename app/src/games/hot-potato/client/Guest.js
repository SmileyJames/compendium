import React from "react";
import Emoji from "components/emoji";
import { Text, Button, Flex, Box } from "rebass/styled-components";

const Container = Box

const EmojiBox = ({ emoji = '♥'}) => (
  <Flex>
    <Box width="20vh" height="20vh">
      <Emoji emoji={emoji}/>
    </Box>
  </Flex>
)

const Disconnected = () => (
  <Container>
    <Text
      fontSize={[ 3, 4, 5 ]}
      fontWeight='bold'
      color='primary'
    >
      Not Connected to the Host!
    </Text>
  </Container>
);

const OpenHands = () => (
  <Container>
    <EmojiBox emoji={'👐'}/>
    <Text
      fontSize={[ 3, 4, 5 ]}
      fontWeight='bold'
      color='primary'
    >
      Phew, no hot potato! 
    </Text>
  </Container>
)

const Potato = ({ onPassPotato = () => {} }) => (
  <Container>
    <EmojiBox emoji={'🥔'}/>
    <Text
      fontSize={[ 3, 4, 5 ]}
      fontWeight='bold'
      color='primary'
    >
      Oww! Hot potato! 
    </Text>
    <Button onClick={onPassPotato} onKeyPress={onPassPotato} variant='primary' mr={2}>Pass the Potato</Button>
  </Container>
)

const Guest = ({ state, roomId, moves, connectionId, connected }) => {
  if (!connected) {
    return (
      <Disconnected/>
    );
  }

  if (state.hotPotato) {
    return (
      <Potato onPassPotato={() => moves.passPotato()} />
    )
  } else {
    return (
      <OpenHands/>
    )
  }  
};

export default Guest;