import Input from "./index";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Labelled Input", () => {
  test("Input has value and calls onChange", () => {
    const onChange = jest.fn();
    const value = "Hello world"
    const label = "Form input"

    const { getByLabelText } = render(
      <Input label={label} onChange={onChange} value={value} />
    );

    const input = getByLabelText("Form input");
    expect(input.value).toBe("Hello world")

    userEvent.type(input, 'User input');
    expect(onChange).toHaveBeenCalledTimes(10);
  })
})