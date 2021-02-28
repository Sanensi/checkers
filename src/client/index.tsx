import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { MainMenu } from "./components/Menus";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Local } from "./components/Local";
import { Online } from "./components/Online";

function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainMenu />
        </Route>
        <Route path="/local" >
          <Local />
        </Route>
        <Route path="/online">
          <Online />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const root = document.getElementById("root");
ReactDOM.render(<Root />, root);