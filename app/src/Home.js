import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { createRoomId } from "./rooms";
import compendium from "./compendium";
import { Heading, Flex } from "rebass/styled-components";
import JoinForm from "components/join-form"
import HostForm from "components/host-form"
import NavBar from "components/navbar"

const Home = () => {
  const { push } = useHistory();
  const [hideMenu, toggleMenu] = useReducer(o => !o, true)

  const onNewGame = (compendiumIndex) => {
    const roomId = createRoomId(compendiumIndex);
    push(`/host/${roomId}`)
  }

  const onJoinGame = (roomId) => {
    push(`/guest/${roomId}`)
  }

  const menuItems = {
    GitHub: "https://www.github.com/SmileyJames/compendium",
    Documentation: "/docs",
    Storybook: "/storybook",
  }

  return (
    <>
      <NavBar menuIsHidden={hideMenu} onMenuToggle={toggleMenu} menuItems={menuItems} />
      <Flex flexWrap="wrap" flexDirection="row" justifyContent="space-evenly">
        <HostForm compendium={compendium} onNewGame={onNewGame} />
        <JoinForm onJoinGame={onJoinGame} />
      </Flex>
    </>
  )
}

export default Home;
