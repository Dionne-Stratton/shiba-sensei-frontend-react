import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import DangerZone from "./DangerZone";

export default function Account(props) {
  const { user, lesson1, setAuth, setUser } = props;
  return (
    <div className="main-page">
      <Profile user={user} setUser={setUser} />
      <Settings user={user} setUser={setUser} />
      <DangerZone
        user={user}
        lesson1={lesson1}
        setAuth={setAuth}
        setUser={setUser}
      />
    </div>
  );
}
