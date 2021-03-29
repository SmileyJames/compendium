import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRoomId } from "./rooms";
import compendium from "./compendium";
import { Heading, Flex, Box, Button } from "rebass/styled-components";
import { Select, Input, Label } from "@rebass/forms/styled-components";


const NewGame = ({ onNewGame }) => {
  const [value, set] = useState(0);

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onNewGame(value);

  return (
    <Box my={4} width={['100%', '80%', '35em']}>
      <Select m={1} onChange={onChange} value={value}>
        {compendium.map(({ name }, index) =>
          <option value={index} key={index}>{name}</option>)}
      </Select>
      <Button m={1} onClick={onSubmit} onKeyPress={onSubmit}>Host New Game</Button>
    </Box>
  )
}

const JoinGame = ({ onJoinGame }) => {
  const [value, set] = useState();

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onJoinGame(value);

  return (
    <Box my={4} width={['100%', '80%', '35em']}>
      <Box>
        <Label>
          Room Password
        </Label>
        <Input onChange={onChange} value={value}/>
      </Box>
      <Button m={1} onClick={onSubmit} onKeyPress={onSubmit}>Join Game</Button>
    </Box>
  );
}


const Home = () => {
  const { push } = useHistory();

  const onNewGame = (compendiumIndex) => {
    const roomId = createRoomId(compendiumIndex);
    push(`/host/${roomId}`)
  }

  const onJoinGame = (roomId) => {
    push(`/guest/${roomId}`)
  }

  return (
    <Flex mx={['2em', '15%', '20%']} flexDirection="column">
      <Heading mt={4} fontSize={[ 5, 6 ]} color='primary'>
        Compendium Games
      </Heading>
      <NewGame onNewGame={onNewGame} />
      <JoinGame onJoinGame={onJoinGame} />
    </Flex>
  )
}


export default Home;
