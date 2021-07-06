import { PrimaryHeader, SecondaryHeader } from "./index";
import { render } from "@testing-library/react";

describe("Headings", () => {
  test("primary header renders contents", () => {
    const { queryByText } = render(<PrimaryHeader>Hello world</PrimaryHeader>);
    expect(queryByText("Hello world")).toBeInTheDocument();
  })

  test("secondary header renders contents", () => {
    const { queryByText } = render(<SecondaryHeader>Hello world</SecondaryHeader>);
    expect(queryByText("Hello world")).toBeInTheDocument();
  })
})
