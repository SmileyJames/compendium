import Heading from "./index";
import { render } from "@testing-library/react";

describe("Headings", () => {
  test("primary header renders contents", () => {
    const { getByText } = render(<Heading>Hello world</Heading>);
    expect(getByText("Hello world").tagName).toBe("H1");
  })

  test("secondary header renders contents", () => {
    const { getByText } = render(<Heading variant="secondary">Howdy partner</Heading>);
    expect(getByText("Howdy partner").tagName).toBe("H2");
  })
})
