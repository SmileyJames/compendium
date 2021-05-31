import React from "react";
import Client from "./Client";

const Guest = (props) => {
  return (
    <Client orientation="white" {...props} />
  );
};

export default Guest;