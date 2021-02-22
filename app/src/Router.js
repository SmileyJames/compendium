import { HashRouter, Switch, Route, useParams } from "react-router-dom";
import { useGame } from "./rooms";
import Home from "./Home";

const HomeRoute = () => 
  <Route exact path="/">
    <Home />
  </Route>

const HostRoute = () => {
  const { roomId } = useParams();
  const { Host } = useGame(roomId);
  return (
    <Route path="/host/:roomId">
      <Host roomId={roomId}/>
    </Route>
  )
}

const GuestRoute = () => {
  const { roomId } = useParams();
  const { Guest } = useGame(roomId);
  return (
    <Route path="/guest/:roomId">
      <Guest roomId={roomId} />
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
