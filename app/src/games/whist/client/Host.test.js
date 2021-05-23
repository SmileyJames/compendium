import Host from "./Host"
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe("Whist host client", () => {
    test("startGame is called on mount", () => {
        const moves = { startGame: jest.fn() }
        const state = {}
        render(<Host state={state} moves={moves}></Host>)
        expect(moves.startGame).toHaveBeenCalled();
    })

    test("deal button appears when game started which calls deal on click", () => {
        const moves = { deal: jest.fn() }
        const state = { deck: [{}, {}]}
        const { getByRole } = render(<Host state={state} moves={moves}></Host>)
        const dealButton = getByRole("button")
        expect(dealButton).toHaveTextContent("Deal")
        expect(moves.deal).not.toHaveBeenCalled();
        userEvent.click(dealButton)
        expect(moves.deal).toHaveBeenCalled();
    })

    test("after cards are dealt...", () => {
        const moves = { deal: jest.fn() }
        const state = { deck: []}
        const { getByRole } = render(<Host state={state} moves={moves}></Host>)
        expect(getByRole('img')).toHaveAttribute('alt', '🂠 Card Back');
    })
})