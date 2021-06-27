import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import NavBar from "./index";

describe("Navigation Bar", () => {
	test("navbar renders when menu is closed and menu button can be clicked", () =>{
    const leftButtonHandler = jest.fn();
    const onMenuToggle = jest.fn();
    const { queryByText, getByText } = render(
      <NavBar 
        leftButtonLabel="[Home]"
        leftButtonHandler={leftButtonHandler}
        title="Hello world"
        menuItems={{ "Menu Item": "/link" }}
        menuIsHidden={true}
        onMenuToggle={onMenuToggle}
      />
    );

    const leftButton = getByText("[Home]")
    expect(leftButton).toBeInTheDocument()
    userEvent.click(leftButton)
    expect(leftButtonHandler).toHaveBeenCalled();

    expect(getByText("Hello world")).toBeInTheDocument();

    expect(queryByText("Menu Item")).not.toBeInTheDocument();

    const rightButton = getByText("Menu")
    expect(rightButton).toBeInTheDocument();
    userEvent.click(rightButton);
    expect(onMenuToggle).toHaveBeenCalled();
  })

	test("navbar and menu render when menu is open and close button can be clicked", () =>{
    const leftButtonHandler = jest.fn();
    const onMenuToggle = jest.fn();
    const menuItemCallback = jest.fn();
    const { getByText } = render(
      <NavBar 
        leftButtonHandler={leftButtonHandler}
        title="Hello world"
        menuItems={{ "Menu Item": "/link", "Other Item": menuItemCallback }}
        menuIsHidden={false}
        onMenuToggle={onMenuToggle}
      />
    );

    const leftButton = getByText("Home")
    expect(leftButton).toBeInTheDocument()
    userEvent.click(leftButton)
    expect(leftButtonHandler).toHaveBeenCalled();

    expect(getByText("Hello world")).toBeInTheDocument();

    const firstMenuItem = getByText("Menu Item");
    expect(firstMenuItem).toBeInTheDocument();
    expect(firstMenuItem).toHaveAttribute("href", "/link");
    expect(menuItemCallback).not.toHaveBeenCalled();

    const secondMenuItem = getByText("Other Item");
    expect(secondMenuItem).toBeInTheDocument();
    userEvent.click(secondMenuItem)
    expect(menuItemCallback).toHaveBeenCalled();

    const rightButton = getByText("Close")
    expect(rightButton).toBeInTheDocument();
    userEvent.click(rightButton);
    expect(onMenuToggle).toHaveBeenCalled();
  })
})