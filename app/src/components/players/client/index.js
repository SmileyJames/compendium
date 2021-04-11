import React from "react";
import Host from "./Host";
import Guest from "./Guest";

const withGuestPlayers = (Component) => ({ children, ...props }) => (
    <Guest {...props}>
        <Component {...props}>
            {children}
        </Component>
    </Guest>
)

const withHostPlayers = (options, Component) => ({ children, ...props }) => (
    <Host {...options} {...props}>
        <Component {...props}>
            {children}
        </Component>
    </Host>
)

export { Host, Guest, withGuestPlayers, withHostPlayers }
