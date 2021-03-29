import { ThemeProvider } from "styled-components";
import { usePartyHost, usePartyGuest } from "@compendium/peer-party";
import { HashRouter, Switch, Route, useParams } from "react-router-dom";
import useGame from "./useGame";
import Home from "./Home";
import baseTheme from "./theme"

const HostRoute = () => {
  const { roomId } = useParams();
  const { theme, Host, game } = useGame(roomId);
  const { state, moves, connections } = usePartyHost({ roomId, game });
  return (
    <ThemeProvider theme={theme || baseTheme}>
      {Host && <Host roomId={roomId} state={state} moves={moves} connections={connections} />}
    </ThemeProvider>
  )
}

const GuestRoute = () => {
  const { roomId } = useParams();
  const { theme,  Guest, game } = useGame(roomId);
  const { connectionId, connected, state, moves } = usePartyGuest({ roomId, game });
  return (
    <ThemeProvider theme={theme || baseTheme}>
      {Guest && <Guest connectionId={connectionId} roomId={roomId} connected={connected} state={state} moves={moves}/>}
    </ThemeProvider>
  )
}

const Router = () =>
  <HashRouter>
    <Switch>
      <Route path="/host/:roomId">
        <HostRoute/>
      </Route>
      <Route path="/guest/:roomId">
        <GuestRoute/>
      </Route>
      <Route exact path="/">
        <ThemeProvider theme={baseTheme}>
          <Home/>
        </ThemeProvider>
      </Route>
    </Switch>
  </HashRouter>

export default Router;
