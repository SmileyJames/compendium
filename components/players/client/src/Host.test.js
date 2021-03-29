import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Host from "./Host";

jest.mock("@compendium/emoji", () => null)

describe("Players Host component", () => {

  test("Initialises state on mount", () => {
    const moves = {
      initPlayers: jest.fn(),
    };
    render(<Host maxPlayers={2} minPlayers={2} moves={moves} state={{}} />);
    expect(moves.initPlayers).toHaveBeenCalledWith({ maxPlayers: 2, minPlayers: 2 })
  });

  test("Start game when there is enough players", () => {
    const state = {
      players: {
        minPlayers: 2,
        maxPlayers: 2,
        list: [{}, {}],
        everyoneIsIn: false,
      }
    }
    const moves = {
      initPlayers: jest.fn(),
      startGame: jest.fn(),
    };
    const { getByText } = render(<Host moves={moves} state={state} />);
    userEvent.click(getByText("Start Game"))
    expect(moves.startGame).toHaveBeenCalled();
  });

  test("Cannot start game if not enough players", () => {
    const state = {
      players: {
        minPlayers: 2,
        maxPlayers: 2,
        list: [{}],
        everyoneIsIn: false,
      }
    }
    const moves = {
      initPlayers: jest.fn(),
      startGame: jest.fn(),
    };
    const { queryByText } = render(<Host moves={moves} state={state} />);
    expect(queryByText("Start Game")).not.toBeInTheDocument();
  });
})
