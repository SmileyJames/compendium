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

export default JoinForm;