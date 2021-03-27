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

const withHostPlayers = (Component) => ({ children, ...props }) => (
    <Host {...props}>
        <Component {...props}>
            {children}
        </Component>
    </Host>
)

export { Host, Guest, withGuestPlayers, withHostPlayers }
