import { useState } from "react";
import { Box, Button } from "rebass/styled-components";
import Dropdown from "components/dropdown";

const HostForm = ({ compendium = [], onNewGame = () => {} }) => {
  const [value, set] = useState(0);

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onNewGame(value);

  const options = compendium.map(({ name }) => name);

  return (
    <Box minWidth="10em" px={2} my={4} width={['60%', '50%', '20em']}>
      <Dropdown options={options} label="Choose a game to host..." onChange={onChange} value={value} />
      <Button my={2} onClick={onSubmit} onKeyPress={onSubmit}>Host New Game</Button>
    </Box>
  )
}

export default HostForm;