import React from "react";
import styled from "styled-components";

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

const PlayerList = ({ children, players }) => {
  return (
    <Main>
      <Section>
        {players.map(({ name, emoji }, index) => (
          <Item key={index}>{name}</Item>
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

const Host = ({ state, roomId, moves, connections, children }) => {
  if (!state.players) return null;
  if (state.players.everyonesIn) return children;
  return (
    <PlayerList players={state.players.list}>
      <HowToJoin roomId={roomId}/>
    </PlayerList>
  )
};

export default Host;
