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
        onClick={onClick && prepareHandler(onClick)}
        onKeyPress={onKeyPress && prepareHandler(onKeyPress)}
        href={href}
      >
        {children}
      </Link>
    </Flex>
  )
}

function MenuItem ({ children, ...rest }) {
  return (
    <NavLink flexGrow="1" justifyContent="center" {...rest}>{children}</NavLink>
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
        {toPairs(menuItems).map(([label, handler]) => (
          handler.constructor === String ? (
            <MenuItem href={handler}>{label}</MenuItem>
          ) : (
            <MenuItem onClick={handler} onKeyPress={handler}>{label}</MenuItem>
          )
        ))}
      </NavMenu>
    </>
  )
}

export default NavBar;