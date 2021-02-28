import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Game } from "./Game";
import { MenuBox } from "./Menus";

export function Online() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <OnlineOptions />
      </Route>
      <Route exact path={`${path}/game`}>
        <Game />
      </Route>
    </Switch>
  )
}

function OnlineOptions() {
  const { url } = useRouteMatch();

  return (
    <MenuBox>
      <div className="has-text-left">
        <label className="label">Display Name and Color</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="online-name" className="input" type="text" placeholder="Name"></input>
          </p>
          <p className="control">
            <input id="online-color" className="input color" type="color" defaultValue="#0000ff"></input>
          </p>
        </div>

        <div className="buttons is-centered">
          <Link to={`${url}/game`} className="button is-primary">Start</Link>
          <Link to="/" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}