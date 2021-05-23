import React from "react"
import { render } from '@testing-library/react'
import { withPlayers } from "."

const Guest = () => <h1>Guest component</h1>
const Host = () => <h1>Host component</h1>

const gameRules = {
    hostMoves: [],
    guestMoves: []
}

const mockGame = { Guest, Host, game: gameRules }

const GameWithPlayers = withPlayers({ minPlayers: 2, maxPlayers: 2 }, mockGame)

describe("Players higher order component: withPlayers", () => {

    test("Guest is wrapped", () => {
        let state = {}
        const { getByRole } = render(<GameWithPlayers.Guest state={state}></GameWithPlayers.Guest>)
        expect(getByRole('heading')).toHaveTextContent("Be patient, the host is setting up your game.")
    })

    test("Host is wrapped", () => {
        const state = { players: { list: [], minPlayers: 2 } }
        const { getByRole } = render(<GameWithPlayers.Host roomId="room-id" state={state}></GameWithPlayers.Host>)
        expect(getByRole('heading')).toHaveTextContent("Join: room-id")
    })

    test("Guest returns children", () => {
        const state = { players: { list: [{}, {}], everyoneIsIn: true } }
        const { getByRole } = render(<GameWithPlayers.Guest state={state}></GameWithPlayers.Guest>)
        expect(getByRole('heading')).toHaveTextContent("Guest component")
    })

    test("Host returns children", () => {
        const state = { players: { list: [{}, {}], minPlayers: 2, everyoneIsIn: true } }
        const { getByRole } = render(<GameWithPlayers.Host state={state}></GameWithPlayers.Host>)
        expect(getByRole('heading')).toHaveTextContent("Host component")
    })
})