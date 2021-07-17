import { useState } from "react";
import { Box } from "rebass/styled-components";
import { Label, Select } from "@rebass/forms/styled-components";
import uniqueId from 'lodash/uniqueId';

function Dropdown({ options, onChange, value, label, ...props }) {
  const [id] = useState(() => uniqueId('input-'))
  return (
    <Box>
      <Label htmlFor={id} color="text" fontFamily="body" my={2}>{label}</Label>
      <Select id={id} color="text" fontFamily="body" my={2} onChange={onChange} value={value}>
        {options.map((option, index) =>
          <option value={index} key={index}>{option}</option>)}
      </Select>
    </Box>
  );
}

export default Dropdown;