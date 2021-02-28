import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { MenuBox } from "./Menus";
import { Game } from "./Game";

export function Local() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <LocalOptions />
      </Route>
      <Route exact path={`${path}/game`}>
        <Game />
      </Route>
    </Switch>
  )
}

function LocalOptions() {
  const { url } = useRouteMatch();

  return (
    <MenuBox>
      <div className="has-text-left">
        <label className="label">Player 1</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="p1-name" className="input" type="text" placeholder="Name"></input>
          </p>
          <p className="control">
            <input id="p1-color" className="input color" type="color" defaultValue="#0000ff"></input>
          </p>
        </div>

        <label className="label">Player 2</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="p2-name" className="input" type="text" placeholder="Name"></input>
          </p>
          <p className="control">
            <input id="p2-color" className="input color" type="color" defaultValue="#ff0000"></input>
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