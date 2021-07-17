import React from "react";
import Client from "./Client";
import JoinScreen from "components/join-screen"

const Host = (props) => {
  if (props.connections.length < 1) {
    return (
      <JoinScreen roomCode={props.roomId}/>
    )
  }

  return (
    <Client orientation="black" {...props} />
  );
};

export default Host;