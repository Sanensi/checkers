import React, { useState } from "react";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import { Room as RoomData, RoomType } from "../../../app/network/OnlineData";
import { useRoot } from "../../hooks/useNavigation";
import { join } from "../../utils/Paths";
import { MenuBox } from "../Menus";

const defaultRoom: RoomData = {
  roomName: "Room-1",
  type: RoomType.Public
}

export function Room() {
  const { online: { lobby: { room } } } = useRoot();

  return (
    <Switch>
      <Route exact path={room.PATH}>
        <CreateRoomOptions />
      </Route>
    </Switch>
  )
}

function CreateRoomOptions() {
  const { online: { lobby } } = useRoot();
  const [room, setRoom] = useState<RoomData>(defaultRoom);

  return (
    <MenuBox title="New Room">
      <div className="has-text-left">
        <div className="field">
          <label className="label">Room name</label>
          <input
            className="input"
            type="text"
            value={room.roomName}
            onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
          />
        </div>
        <div className="field">
          <label className="label">Visibility</label>
          <div className="select is-fullwidth">
            <select
              value={room.type}
              onChange={(e) => setRoom({ ...room, type: RoomType[e.target.value] })}
            >
              {Object.values(RoomType).map(type => (
                <option>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="buttons is-centered">
          <Link to={join(lobby.room.PATH, 'some-room')} className="button is-primary">Create</Link>
          <Link to={lobby.PATH} className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}