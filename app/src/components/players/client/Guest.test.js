import React from "react";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Guest from "./Guest";

const moves = {
  joinAsAPlayer: jest.fn(),
}

describe("Players Guest component", () => {

  test("Join game", () => {

    const state = {
      players: {
        maxPlayers: 4,
        minPlayers: 4,
        everyonesIn: false,
        list: []
      }
    }

    const { getByText, getByLabelText, fireEvent } = render(
      <Guest roomId="xxx" connectionId="aaa" state={state} moves={moves}>
        <h1>Hello world</h1>
      </Guest>
    )

    userEvent.type(getByLabelText("Nickname"), "Matt");

    userEvent.click(getByText("Sit down to Play"));

    expect(moves.joinAsAPlayer).toHaveBeenCalledWith({ name: "Matt", emoji: '😎' })

  });

})
