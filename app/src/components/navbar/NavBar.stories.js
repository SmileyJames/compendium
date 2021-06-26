import React from 'react';
import NavBar from "components/navbar";

export default {
  title: 'Components/NavBar',
  component: NavBar,
};

const Template = (props) => (
  <NavBar {...props}/>
);

export const NavBarMenuOpen = Template.bind({});
NavBarMenuOpen.args = {
  title: '️Compendium Games',
  menuIsHidden: false,
  onMenuToggle: () => console.log("Toggled"),
  menuItems: {
    "Github": () => console.log("GitHub"),
    "Docs": () => console.log("GitHub"),
    "Stories": () => console.log("GitHub"),
  }
};

export const NavBarMenuClosed = Template.bind({});
NavBarMenuClosed.args = {
  title: '️Free Beer',
  menuIsHidden: true,
  onMenuToggle: () => console.log("Toggled"),
  menuItems: {
    "Github": () => console.log("GitHub"),
    "Docs": () => console.log("GitHub"),
    "Stories": () => console.log("GitHub"),
  }
};