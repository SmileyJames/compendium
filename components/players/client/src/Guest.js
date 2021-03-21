import React, { useState, useReducer } from "react";
import styled from "styled-components";
import Emoji from "@compendium/emoji";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: inline-block;
`;
 
const EmojiPicker = ({ onSelectEmoji, onHide }) => {
  const onSelect = (emoji) => {
    onSelectEmoji(emoji.native);
  }
  return (
    <Background tabIndex onKeyPress={onHide} onClick={onHide}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Picker onSelect={onSelect} set="twitter" />
      </Wrapper>
    </Background>
  );
};

const Name = styled.h1`

`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`

`;

const Button = styled.button`

`;

const SmallSquare = styled.div`
  width: 10em;
  height: 10em;
  margin: 0 auto;
`;

const JoinScreen = ({ moves }) => {
  const [name, setName] = useState();
  const [emoji, setEmoji] = useState('😎');
  const [pickerIsShown, setPickerIsShown] = useState(false);
  const showPicker = () => setPickerIsShown(true);
  const hidePicker = () => setPickerIsShown(false);

  const join = () => {
    // moves.newPlayer({ name, emoji }); 
  }

  const onSelectEmoji = (emoji) => {
    setEmoji(emoji);
    hidePicker();
  }

  return (
    <>
      {pickerIsShown && <EmojiPicker onHide={hidePicker} onSelectEmoji={onSelectEmoji} />}
      <Main>
        <SmallSquare tabindex onKeyPress={showPicker} onClick={showPicker}>
          <Emoji emoji={emoji}/>
        </SmallSquare>
        <Name>{name}</Name>
        <Input onChange={(e) => setName(e.target.value)} value={name}/>
        <Button onKeyPress={join} onClick={join}>
          Sit down to Play
        </Button>
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

const Guest = ({ children, state, roomId, moves, connectionId }) => {
  if (!state.players) {
    return <Waiting/>;
  }

  const isPlayer = findConnectionIsPlayer({ players: state.players.list, connectionId });

  if (state.players.everyonesIn) {
    return isPlayer ? children : <Spectator/>;
  }  else {
    return isPlayer ? <Waiting/> : <JoinScreen moves={moves}/>;
  }
}

export default Guest;
