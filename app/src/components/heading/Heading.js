import { Heading } from "rebass/styled-components";

const fontSizeVariants = {
  primary: [4,5,6],
  secondary: [3,4,5],
}

const asVariants = {
  primary: "h1",
  secondary: "h2",
}

function Header({ children, variant = "primary", ...props }) {
  const fontSize = fontSizeVariants[variant];
  const as = asVariants[variant];
  return (
    <Heading color="text" fontFamily="heading" fontSize={fontSize} as={as} {...props}>
      {children}
    </Heading>
  );
}

export default Header;