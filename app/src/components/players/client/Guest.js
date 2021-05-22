import React, { useState } from "react";
import Emoji, { EmojiPicker } from "components/emoji";
import { Flex, Box, Button, Text } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";

const JoinScreen = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState('😎');
  const [pickerIsShown, setPickerIsShown] = useState(false);
  const showPicker = () => setPickerIsShown(true);
  const hidePicker = () => setPickerIsShown(false);

  const join = () => {
    name?.length && onJoin({ name, emoji })
  }

  const onSelectEmoji = (emoji) => {
    setEmoji(emoji);
    hidePicker();
  }

  return (
    <>
      {pickerIsShown && <EmojiPicker onHide={hidePicker} onSelectEmoji={onSelectEmoji} />}
      <Flex my={5} alignItems="center" flexDirection="column">
        <Box width={'10em'} height={'10em'} onKeyPress={showPicker} onClick={showPicker}>
          <Emoji emoji={emoji}/>
        </Box>
        <Box my={2}>
          <Text fontSize={[ 3, 4, 5 ]} fontWeight='bold' color='primary'>
            {name}
          </Text>
        </Box>
        <Box>
          <Label htmlFor="nickname">Nickname</Label>
          <Input id="nickname" onChange={(e) => setName(e.target.value)} value={name}/>
        </Box>
        <Box my={3}>
          <Button variant="primary" onKeyPress={join} onClick={join}>
            Sit down to Play
          </Button>
        </Box>
      </Flex>
    </>
  );
}

const Spectator = () => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <Text fontSize={[ 3, 4, 5 ]} fontWeight='bold' color='primary'>
      You are a Spectator
    </Text>
  </Flex>
)

const Waiting = () => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <Text fontSize={[ 3, 4, 5 ]} fontWeight='bold' color='primary'>
      Be patient, the host is setting up your game.
    </Text>
  </Flex>
)

const findConnectionIsPlayer = ({ players, connectionId }) => (
  players.findIndex(player => player.connectionId === connectionId) > -1
)

const checkIfGameIsFull = ({ state: { players } }) => (
  players.list.length > players.maxPlayers
);

const Guest = ({ children, state, roomId, moves, connectionId }) => {
  if (!state.players) {
    return <Waiting/>;
  }

  const isPlayer = findConnectionIsPlayer({ players: state.players.list, connectionId });

  const onJoin = ({ name, emoji }) => {
    moves.joinAsAPlayer({ name, emoji });
  }

  if (state.players.everyonesIn) {
    return isPlayer ? children : <Spectator/>;
  } else {
    const gameIsFull = checkIfGameIsFull({ state });
    return isPlayer || gameIsFull ? <Waiting/> : <JoinScreen onJoin={onJoin}/>;
  }
}

export default Guest;
