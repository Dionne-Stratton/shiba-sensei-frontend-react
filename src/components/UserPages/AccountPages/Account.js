import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import DangerZone from "./DangerZone";

export default function Account(props) {
  const { user } = props;
  return (
    <div className="main-page">
      <Profile user={user} />
      <Settings user={user} />
      <DangerZone user={user} />
    </div>
  );
}
