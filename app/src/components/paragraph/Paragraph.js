import { Text } from "rebass/styled-components";

function Paragraph ({ children, ...props }) {
  return (
    <Text {...props} as="p" color="text" fontFamily="body" fontSize={[1,2,3]}>
      {children}
    </Text>
  );
}

export default Paragraph;