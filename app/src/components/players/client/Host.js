import React, { useEffect } from "react";
import Emoji from "components/emoji";
import { Flex, Box, Button, Text } from "rebass/styled-components";

const checkIfCanStartGame = ({ state: { players } }) => (
  players.list.length >= players.minPlayers
);

const PlayerList = ({ children, players }) => {
  return (
    <Flex>
      <Box flexGrow={1}>
        {players.map(({ name, emoji }, index) => (
          <Flex alignItems="center"  key={index}>
            <Box width="2em" height="2em" my={2} mx={3}>
              {emoji && <Emoji emoji={emoji}/>}
            </Box>
            {name}
          </Flex>
        ))}
      </Box>
      <Box flexGrow={3}>
        {children}
      </Box>
    </Flex>
  );
}

const HowToJoin = ({ roomId }) => (
  <Text fontSize={[ 3, 4, 5 ]} fontWeight='bold' color='secondary'>
    Join: {roomId}
  </Text>
)

const Host = ({ state, roomId, moves, connections, maxPlayers, minPlayers, children }) => {
  useEffect(() => {
    if (!state.players && moves?.initPlayers) {
      moves.initPlayers({ maxPlayers, minPlayers });
    }
  }, [state.players, moves]);

  if (!state.players) return null;
  if (state.players.everyonesIn) return children;
  const canStartGame = checkIfCanStartGame({ state });
  return (
    <PlayerList players={state.players.list}>
      <Flex height="100%" flexDirection="column" alignItems="center" justifyContent="space-around">
        <HowToJoin roomId={roomId}/>
        {canStartGame && (
          <Button
            my={2}
            onClick={() => moves.startGame()}
            onKeyPress={() => moves.startGame()}
          >
            Start Game
          </Button>
        )}
      </Flex>
    </PlayerList>
  )
};

export default Host;
