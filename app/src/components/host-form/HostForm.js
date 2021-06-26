import { useState } from "react";
import { Box, Button } from "rebass/styled-components";
import { Select } from "@rebass/forms/styled-components";

const HostForm = ({ compendium = [], onNewGame = () => {} }) => {
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

export default HostForm;