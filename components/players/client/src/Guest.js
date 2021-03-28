import React, { useState } from "react";
import styled from "styled-components";
import Emoji, { EmojiPicker } from "@compendium/emoji";

const Row = styled.div`
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;d
`;

const Input = styled.input`
  border-radius: 0.2em;
  border: solid 1px grey;
  padding: 0.3em 0.6em;
  margin: 0.6em
`;

const Button = styled.button`
  border-radius: 0.2em;
  background-color: rgb(10, 50, 200);
  color: white;
  border: solid 1px grey;
  padding: 0.3em 0.6em;
  margin: 0.6em
`;

const SmallSquare = styled.div`
  width: 10em;
  height: 10em;
  margin: 0 auto;
`;

const JoinScreen = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState('😎');
  const [pickerIsShown, setPickerIsShown] = useState(false);
  const showPicker = () => setPickerIsShown(true);
  const hidePicker = () => setPickerIsShown(false);

  const join = () => {
    name?.length && onJoin({ name, emoji })
  }

  const onSelectEmoji = (emoji) => {
    setEmoji(emoji);
    hidePicker();
  }

  return (
    <>
      {pickerIsShown && <EmojiPicker onHide={hidePicker} onSelectEmoji={onSelectEmoji} />}
      <Main>
        <SmallSquare tabIndex={0} onKeyPress={showPicker} onClick={showPicker}>
          <Emoji emoji={emoji}/>
        </SmallSquare>
        <Row>
          <h1>{name}</h1>
        </Row>
        <Row>
          <label>
            Nickname
           <Input onChange={(e) => setName(e.target.value)} value={name}/>
          </label>
        </Row>
        <Row>
          <Button type="button" onKeyPress={join} onClick={join}>
            Sit down to Play
          </Button>
        </Row>
      </Main>
    </>
  );
}

const Spectator = () => (
  <h1>You are a Spectator</h1>
)

const Waiting = () => (
  <h1>Be patient, the host is setting up your game.</h1>
)

const findConnectionIsPlayer = ({ players, connectionId }) => (
  players.findIndex(player => player.connectionId === connectionId) > -1
)

const checkIfGameIsFull = ({ state: { players } }) => (
  players.list.length > players.maxPlayers
);

const Guest = ({ children, state, roomId, moves, connectionId }) => {
  if (!state.players) {
    return <Waiting/>;
  }

  const isPlayer = findConnectionIsPlayer({ players: state.players.list, connectionId });

  const onJoin = ({ name, emoji }) => {
    moves.joinAsAPlayer({ name, emoji });
  }

  if (state.players.everyonesIn) {
    return isPlayer ? children : <Spectator/>;
  } else {
    const gameIsFull = checkIfGameIsFull({ state });
    return isPlayer || gameIsFull ? <Waiting/> : <JoinScreen onJoin={onJoin}/>;
  }
}

export default Guest;
