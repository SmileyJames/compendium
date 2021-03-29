import { usePartyHost, usePartyGuest } from "@compendium/peer-party";
import { HashRouter, Switch, Route, useParams } from "react-router-dom";
import useGame from "./useGame";
import Home from "./Home";

const HostRoute = () => {
  const { roomId } = useParams();
  const { Host, game } = useGame(roomId);
  const { state, moves, connections } = usePartyHost({ roomId, game });
  return (
    Host && <Host roomId={roomId} state={state} moves={moves} connections={connections} />
  )
}

const GuestRoute = () => {
  const { roomId } = useParams();
  const { Guest, game } = useGame(roomId);
  const { connectionId, connected, state, moves } = usePartyGuest({ roomId, game });
  return (
    Guest && <Guest connectionId={connectionId} roomId={roomId} connected={connected} state={state} moves={moves}/>
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
        <Home/>
      </Route>
    </Switch>
  </HashRouter>

export default Router;
