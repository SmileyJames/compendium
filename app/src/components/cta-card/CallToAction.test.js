import CallToActionCard from "./index";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Call to Action Card", () => {
  test("renders image, header, body and clickable button with label", () => {
    const onAction = jest.fn();
    const { getByText, getByRole } = render(
      <CallToActionCard
        bodyText="big body baby"
        headingText="Heading up the West Coast"
        imageSrc="big_apple.png"
        imageAlt="An apple that is big"
        buttonLabel="Click Me"
        onAction={onAction}
      />
    )

    expect(getByText("big body baby")).toBeInTheDocument();
    expect(getByText("Heading up the West Coast")).toBeInTheDocument();

    const image = getByRole("img");
    expect(image).toHaveAttribute("src", "big_apple.png");
    expect(image).toHaveAttribute("alt", "An apple that is big");

    const button = getByRole("button")
    expect(button).toHaveTextContent("Click Me")
    userEvent.click(button);
    expect(onAction).toHaveBeenCalled();
  });
})