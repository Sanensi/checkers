import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { HTMLAttributes, HTMLProps, useState } from "react";
import { PlayerConfig } from "../../app/game/GameData";
import { Link } from "react-router-dom";

interface Room {
  roomName: string;
  player1: string;
  player2: string;
  status: "public" | "private" | "in progress";
}

interface Props {
  player: PlayerConfig;
}

export function Lobby({ player }: Props) {
  const [rooms, setRooms] = useState<Room[]>([...Array(20).keys()].map(i => {
    const playerName = `Player ${i}`;
    return {
      roomName: `${playerName}'s room`,
      player1: playerName,
      player2: "",
      status: "private"
    }
  }));

  return (
    <div className="hero is-fullheight">
      <div className="hero-body is-align-items-stretch">
        <div className="container">
          <div className="box" style={{ height: "100%" }}>
            <h1 className="title block has-text-centered">Online Lobby</h1>
            <div className="block is-size-5 is-flex">
              <p>
                Players in matchmaking: 0
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
              <button className="button mx-1">Create Room</button>
              <button className="button mx-1">Matchmaking</button>
              <span className="is-flex-grow-1"></span>
              <Link to="/" className="button mx-1">Quit</Link>
            </div>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Room name</th>
                  <th>Player 1</th>
                  <th>Player 2</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr>
                    <td>{room.roomName}</td>
                    <td>{room.player1}</td>
                    <td>{room.player2}</td>
                    <td>{room.status}</td>
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
