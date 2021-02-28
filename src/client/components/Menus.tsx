import { Link } from "react-router-dom";

export function MenuBox(props: React.PropsWithChildren<{}>) {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container is-fluid is-flex columns is-centered">
          <div className="box column is-one-quarter is-three-quarters-mobile has-text-centered">
            <h1 className="title block">
              Checkers
            </h1>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MainMenu() {
  return (
    <MenuBox>
      <div>
        <div className="control block">
          <Link to="/local" className="button is-fullwidth">Local Game</Link>
        </div>

        <div className="control block">
          <Link to="/online" className="button is-fullwidth">Online Game</Link>
        </div>
      </div>
    </MenuBox>
  )
}