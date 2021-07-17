import React, { useState } from "react";
import { Box, Button } from "rebass/styled-components";
import Input from "components/input"

const JoinForm = ({ onJoinGame = () => {} }) => {
  const [value, set] = useState();

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onJoinGame(value);

  return (
    <Box minWidth="10em" px={2} my={4} width={['60%', '50%', '20em']}>
      <Input onChange={onChange} value={value} label="Enter the code to join a game"/>
      <Button my={2} onClick={onSubmit} onKeyPress={onSubmit}>Join Game</Button>
    </Box>
  );
}

export default JoinForm;