import React from "react";
import { Switch, useRouteMatch } from "react-router";
import { Link, Route } from "react-router-dom";
import { MenuBox } from "../Menus";

export interface RoomType {
  roomName: string;
  player1: string;
  player2: string;
  status: "public" | "private" | "in progress";
}

export function Room() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <CreateRoomOptions />
      </Route>
    </Switch>
  )
}

function CreateRoomOptions() {
  const { url } = useRouteMatch();

  return (
    <MenuBox title="New Room">
      <div className="has-text-left">
        <div className="field">
          <label className="label">Room name</label>
          <input
            className="input"
            type="text"
          />
        </div>
        <div className="field">
          <label className="label">Visibility</label>
          <div className="select is-fullwidth">
            <select>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <div className="buttons is-centered">
          <Link to={`${url}/some-id`} className="button is-primary">Create</Link>
          <Link to="/online/lobby" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}