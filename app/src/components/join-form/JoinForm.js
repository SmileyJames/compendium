import React, { useState } from "react";
import { Box, Button } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";

const JoinForm = ({ onJoinGame = () => {} }) => {
  const [value, set] = useState();

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onJoinGame(value);

  return (
    <Box px={2} my={4} width={['100%', '80%', '25em']}>
      <Box>
        <Label my={2}>
	  Enter the code to join a game
        </Label>
        <Input my={2} onChange={onChange} value={value}/>
      </Box>
      <Button my={2} onClick={onSubmit} onKeyPress={onSubmit}>Join Game</Button>
    </Box>
  );
}

export default JoinForm;