import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { MainMenu } from "./components/Menus";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Local } from "./components/Local";
import { Online } from "./components/Online";
import { useRoot } from "./hooks/useNavigation";

function Root() {
  const root = useRoot();

  return (
    <BrowserRouter>
      <RemoveTrailingSlash />
      <Switch>
        <Route exact path={root.PATH}>
          <MainMenu />
        </Route>
        <Route path={root.local.PATH} >
          <Local />
        </Route>
        <Route path={root.online.PATH} >
          <Online />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function RemoveTrailingSlash() {
  return <Route
    exact
    strict
    path="(.*//+.*)"
    render={({ location }) => <Redirect to={location.pathname.replace(/\/\/+/g, '/')} />}
  />
}

const root = document.getElementById("root");
ReactDOM.render(<Root />, root);