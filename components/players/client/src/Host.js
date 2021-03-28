import React, { useEffect } from "react";
import styled from "styled-components";
import Emoji from "@compendium/emoji";

const Main = styled.main`
  display: flex;
`;

const Section = styled.section`
  flex-grow: 1; 
`;

const Article = styled.article`
  flex-grow: 3; 
`;

const Item = styled.div`
  padding: .4em;
  border: solid 1px gray;
`;

const Square = styled.div`
  width: 2em;
  height: 2em;
  padding: 0.3em;
  display: inline-block;
`;

const Button = styled.button`

`;

const checkIfCanStartGame = ({ state: { players } }) => (
  players.list.length >= players.minPlayers
);

const PlayerList = ({ children, players }) => {
  return (
    <Main>
      <Section>
        {players.map(({ name, emoji }, index) => (
          <Item key={index}>
            <Square>
              {emoji && <Emoji emoji={emoji}/>}
            </Square>
            {name}
          </Item>
        ))}
      </Section>
      <Article>
        {children}
      </Article>
    </Main>
  );
}

const HowToJoin = ({ roomId }) => (
  <h1>Join: {roomId}</h1>
)

const Host = ({ state, roomId, moves, connections, maxPlayers, minPlayers, children }) => {
  useEffect(() => {
    if (!state.players && moves?.initPlayers) {
      moves.initPlayers({ maxPlayers, minPlayers });
    }
  }, [state.players, moves]);

  if (!state.players) return null;
  if (state.players.everyonesIn) return children;
  const canStartGame = checkIfCanStartGame({ state });
  return (
    <PlayerList players={state.players.list}>
      <HowToJoin roomId={roomId}/>
      {canStartGame && (
        <Button
          onClick={() => moves.startGame()}
          onKeyPress={() => moves.startGame()}
        >
          Start Game
        </Button>
      )}
    </PlayerList>
  )
};

export default Host;
