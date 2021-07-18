import React from "react";
import Client from "./Client";
import HowToJoin from "components/how-to-join"

const Host = (props) => {
  if (props.connections.length < 1) {
    return (
      <HowToJoin roomCode={props.roomId}/>
    )
  }

  return (
    <Client orientation="black" {...props} />
  );
};

export default Host;