import Paragraph from "./index";
import { render } from "@testing-library/react";

describe("Paragraph", () => {
  test("render contents", () => {
    const { queryByText } = render(<Paragraph>Hello world</Paragraph>);
    expect(queryByText("Hello world")).toBeInTheDocument();
  })
})
