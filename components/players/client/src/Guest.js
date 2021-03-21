import React from "react";
import styled from "styled-components";

const JoinScreen = () => {
  return (
    <h1>Join</h1>
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
    return isPlayer ? <Waiting/> : <JoinScreen/>;
  }
}

export default Guest;
