import { useState } from "react";
import { Box } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import uniqueId from 'lodash/uniqueId';

function LabelledInput({
  label,
  onChange = () => {},
  value = "",
  placeholder = "",
  ...props
}) {
  const [id] = useState(() => uniqueId('input-'))
  return (
    <Box>
      <Label htmlFor={id} color="text" fontFamily="body" my={2}>{label}</Label>
      <Input id={id} color="text" fontFamily="body" my={2} onChange={onChange} value={value} placeholder={placeholder}/>
    </Box>
  );
}

export default LabelledInput;