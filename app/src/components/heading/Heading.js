import { Heading } from "rebass/styled-components";

function Header({ children, ...props }) {
  return (
    <Heading color="text" fontFamily="heading" {...props}>
      {children}
    </Heading>
  );
}

const withPrimary = (Component) => (props) => (
  <Component as="h1" fontSize={[4,5,6]} {...props}/>
)

const withSecondary = (Component) => (props) => (
  <Component as="h2" fontSize={[3,4,5]} {...props}/>
)

const PrimaryHeader = withPrimary(Header);
const SecondaryHeader = withSecondary(Header);

export { PrimaryHeader, SecondaryHeader };
