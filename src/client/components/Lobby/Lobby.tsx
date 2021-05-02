import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Room } from "./Room";
import { useRoot } from "../../hooks/useNavigation";
import { useOnlineContext } from "../../context/OnlineContext";

export function Lobby() {
  const { online: { lobby } } = useRoot();

  return (
    <Switch>
      <Route exact path={lobby.PATH}>
        <LobbyDisplay />
      </Route>
      <Route path={lobby.room.PATH}>
        <Room />
      </Route>
    </Switch>
  )
}

function LobbyDisplay() {
  const root = useRoot();
  const { player: { config: player }, lobby } = useOnlineContext();

  return (
    <div className="hero is-fullheight">
      <div className="hero-body is-align-items-stretch">
        <div className="container">
          <div className="box" style={{ height: "100%" }}>
            <h1 className="title block has-text-centered">Online Lobby</h1>
            <div className="block is-size-5 is-flex">
              <p>
                Players in matchmaking: {lobby.numberOfPlayersInMatchmaking}
              </p>
              <span className="is-flex-grow-1"></span>
              <p>
                {player.name}
                <FontAwesomeIcon
                  className="mx-3"
                  color={player.color}
                  icon={faCircle}
                  size="sm"
                />
              </p>
            </div>
            <div className="block is-flex">
              <Link to={root.online.lobby.room.PATH} className="button mx-1">Create Room</Link>
              <button className="button mx-1">Matchmaking</button>
              <span className="is-flex-grow-1"></span>
              <Link to={root.PATH} className="button mx-1">Quit</Link>
            </div>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Room name</th>
                  <th>Player 1</th>
                  <th>Player 2</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {lobby.rooms.map(room => (
                  <tr key={room.roomName}>
                    <td>{room.roomName}</td>
                    <td>{room.player1}</td>
                    <td>{room.player2}</td>
                    <td>{room.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
