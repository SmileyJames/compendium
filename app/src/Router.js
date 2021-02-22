import { usePartyHost, usePartyGuest } from "@compendium/peer-party";
import { HashRouter, Switch, Route, useParams } from "react-router-dom";
import { useGame } from "./rooms";
import Home from "./Home";

const HomeRoute = () => 
  <Route exact path="/">
    <Home />
  </Route>

const HostRoute = () => {
  const { roomId } = useParams();
  const { Host, game } = useGame(roomId);
  const { state, moves } = usePartyHost({ roomId, game });
  return (
    <Route path="/host/:roomId">
      <Host roomId={roomId} state={state} moves={moves} />
    </Route>
  )
}

const GuestRoute = () => {
  const { roomId } = useParams();
  const { Guest, game } = useGame(roomId);
  const { state, moves } = usePartyGuest({ roomId, game });
  return (
    <Route path="/guest/:roomId">
      <Guest roomId={roomId} state={state} moves={moves}/>
    </Route>
  )
}

const Router = () =>
  <HashRouter>
    <Switch>
      <HomeRoute/>
      <HostRoute/>
      <GuestRoute/>
    </Switch>
  </HashRouter>

export default Router;
