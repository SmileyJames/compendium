import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { createRoomId } from "./rooms";
import compendium from "./compendium";
import { Flex } from "rebass/styled-components";
import JoinForm from "components/join-form";
import HostForm from "components/host-form";
import NavBar from "components/navbar";
import TypedBanner from "components/typed-banner";
import CallToActionCard from "components/cta-card"

const Home = ({ stopped }) => {
  const { push } = useHistory();
  const [hideMenu, toggleMenu] = useReducer(o => !o, true)

  const onNewGame = (compendiumIndex) => {
    const roomId = createRoomId(compendiumIndex);
    push(`/host/${roomId}`)
  }

  const onJoinGame = (roomId) => {
    push(`/guest/${roomId}`)
  }

  const onGoHome = () => push("/");

  const menuItems = {
    GitHub: "https://www.github.com/SmileyJames/compendium",
    Documentation: "/docs",
    Storybook: "/storybook",
  }

  const typedSentences = 
    compendium.map(o => o.name).map(name => `Remotely play a game of ${name}!`)

  return (
    <>
      <NavBar leftButtonHandler={onGoHome} menuIsHidden={hideMenu} onMenuToggle={toggleMenu} menuItems={menuItems} />
      <Flex flexWrap="wrap" flexDirection="row" justifyContent="space-evenly">
        <HostForm compendium={compendium} onNewGame={onNewGame} />
        <JoinForm onJoinGame={onJoinGame} />
      </Flex>
      <TypedBanner stopped={stopped} typedSentences={typedSentences}/>
      <Flex justifyContent="space-around" flexDirection="row" flexWrap="wrap">
        {
          compendium.map(
            ({ name, image, description }, index) => (
              <CallToActionCard
                key={index}
                variant={index === 0 ? "primary" : "secondary"}
                headingText={name}
                imageSrc={image.src}
                imageAlt={image.alt}
                bodyText={description}
                onAction={() => onNewGame(index)}
                buttonLabel={`Start ${name}`}
              />
            )
          )
        }
      </Flex>
    </>
  )
}

export default Home;
