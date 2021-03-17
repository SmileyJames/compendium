import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRoomId } from "./rooms";
import compendium from "./compendium";

const NewGame = ({ onNewGame }) => {
  const [value, set] = useState(0);

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onNewGame(value);

  return (
    <>
      <select onChange={onChange} value={value}>
        {compendium.map(({ name }, index) =>
          <option value={index} key={index}>{name}</option>)}
      </select>
      <button onClick={onSubmit} onKeyPress={onSubmit}>Host New Game</button>
    </>
  )
}

const JoinGame = ({ onJoinGame }) => {
  const [value, set] = useState();

  const onChange = (e) => {
    set(e.target.value);
    e.preventDefault();
  }

  const onSubmit = () => onJoinGame(value);

  return (
    <>
      <label>
        Room Password
        <input onChange={onChange} value={value}/>
      </label>
      <button onClick={onSubmit} onKeyPress={onSubmit}>Join Game</button>
    </>
  );
}


const Home = () => {
  const { push } = useHistory();

  const onNewGame = (compendiumIndex) => {
    const roomId = createRoomId(compendiumIndex);
    push(`/host/${roomId}`)
  }

  const onJoinGame = (roomId) => {
    push(`/guest/${roomId}`)
  }

  return (
    <>
      <NewGame onNewGame={onNewGame} />
      <JoinGame onJoinGame={onJoinGame} />
    </>
  )
}


export default Home;
