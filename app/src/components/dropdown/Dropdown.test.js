import Dropdown from "./index";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Dropdown", () => {
  test("Dropdown has value and calls onChange", () => {
    const options = ["Hello", "Goodbye", "How do you do"];
    const onChange = jest.fn();
    const value = 2
    const label = "Form input"

    const { getByRole, getByLabelText } = render(
      <Dropdown options={options} label={label} onChange={onChange} value={value} />
    );

    const dropdown = getByLabelText("Form input");
    expect(dropdown.value).toBe("2")

    expect(getByRole('option', { name: 'Hello' }).selected).toBe(false)
    expect(getByRole('option', { name: 'Goodbye' }).selected).toBe(false)
    expect(getByRole('option', { name: 'How do you do' }).selected).toBe(true)

    userEvent.selectOptions(dropdown, ["0"])
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})