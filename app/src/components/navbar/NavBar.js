import toPairs from "lodash/toPairs";
import { useReducer } from "react";
import { useHistory } from "react-router-dom"
import { Flex, Text, Link } from "rebass/styled-components";

function NavHeading({ children }) {
  return (
    <Flex flexGrow={2} justifyContent="center" alignItems="center">
      <Text>{children}</Text>
    </Flex>
  ) 
}

function NavLink({ children, onKeyPress, onClick, href="#", ...rest }) {
  const prepareHandler = (handler) => (e) => {
    e.preventDefault();
    if (handler) handler();
    return false;
  }
  return (
    <Flex {...rest} py={2} px={3}>
      <Link
        variant="nav"
        onClick={prepareHandler(onClick)}
        onKeyPress={prepareHandler(onKeyPress)}
        href={href}
      >
        {children}
      </Link>
    </Flex>
  )
}

function MenuItem ({ children }) {
  return (
    <NavLink flexGrow="1" justifyContent="center">{children}</NavLink>
  )
}

function Nav ({ children }) {
  return (
    <Flex p={1} backgroundColor={"muted"}>
      {children}
    </Flex>
  )
}

function NavMenu ({ children, hidden }) {
  if (hidden) return null;
  return (
    <Flex p={1} backgroundColor={"highlight"}>
      {children}
    </Flex>
  )
}

function NavBar ({
  leftButtonLabel = "Home",
  leftButtonHandler = () => {},
  title = "Compendium Games",
  onMenuToggle = () => {},
  menuIsHidden = false,
  menuItems = {}
 }) {
  const history = useHistory();
  const goHome = () => history.push("/")
  return (
    <>
      <Nav>
        <NavLink onClick={goHome} onKeyPress={goHome}>Home</NavLink>
        <NavHeading>{title}</NavHeading>
        <NavLink onClick={onMenuToggle} onKeyPress={onMenuToggle}>
          {menuIsHidden ? "Menu" : "Close"}
        </NavLink>
      </Nav>
      <NavMenu hidden={menuIsHidden}>
        {toPairs(menuItems).map(([label, fn]) => (
          <MenuItem onClick={fn} onKeyPress={fn}>{label}</MenuItem>
        ))}
      </NavMenu>
    </>
  )
}

export default NavBar;