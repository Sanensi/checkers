import { Link } from "react-router-dom";
import { PlayerConfig } from "../../app/game/GameData";

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

export function PlayerConfiguration({ label, player, onChange }: {
  label: string,
  player: PlayerConfig,
  onChange: (p: PlayerConfig) => void
}) {
  return <>
    <label className="label">{label}</label>
    <div className="field is-grouped">
      <p className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={player.name}
          onChange={e => onChange({...player, name: e.target.value})}
        />
      </p>
      <p className="control">
        <input
          className="input color"
          type="color"
          value={player.color}
          onChange={e => onChange({...player, color: e.target.value})}
        />
      </p>
    </div>
  </>
}