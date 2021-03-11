import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { MainMenu } from "./components/Menus";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Local } from "./components/Local";

function Root() {
  return (
    <BrowserRouter>
      <RemoveTrailingSlash />
      <Switch>
        <Route exact path="/">
          <MainMenu />
        </Route>
        <Route path="/local" >
          <Local />
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