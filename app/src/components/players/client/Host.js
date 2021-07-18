import React, { useEffect } from "react";
import Emoji from "components/emoji";
import { Flex, Box, Button } from "rebass/styled-components";
import HowToJoin from "components/how-to-join";
import Paragraph from "components/paragraph";

const checkIfCanStartGame = ({ state: { players } }) => (
  players.list.length >= players.minPlayers
);

const PlayerList = ({ children, players }) => {
  return (
    <Flex flexWrap="wrap">
      <Flex flexGrow={2} flexDirection="column">
        {players.map(({ name, emoji }, index) => (
          <Flex alignItems="center" key={index} px={2}>
            <Box width="2em" height="2em" my={2} mx={3}>
              {emoji && <Emoji emoji={emoji}/>}
            </Box>
            <Paragraph>
              {name}
            </Paragraph>
          </Flex>
        ))}
      </Flex>
      <Flex flexGrow={1}>
        {children}
      </Flex>
    </Flex>
  );
}

const Host = ({ state, roomId, moves, connections, maxPlayers, minPlayers, children }) => {
  useEffect(() => {
    if (!state.players && moves?.initPlayers) {
      moves.initPlayers({ maxPlayers, minPlayers });
    }
  }, [state.players, moves]);

  if (!state.players) return null;
  if (state.players.everyoneIsIn) return children;
  const canStartGame = checkIfCanStartGame({ state });
  return (
    <PlayerList players={state.players.list}>
      <Flex flexDirection="column" alignItems="center">
        {canStartGame && (
          <Button
            my={2}
            onClick={() => moves.everyoneIsIn()}
            onKeyPress={() => moves.everyoneIsIn()}
          >
            Start Game
          </Button>
        )}
        <HowToJoin roomCode={roomId}/>
      </Flex>
    </PlayerList>
  )
};

export default Host;
