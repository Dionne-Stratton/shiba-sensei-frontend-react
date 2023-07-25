import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";

export default function Account(props) {
  const { user, setUser } = props;
  return (
    <div className="main-page">
      <Profile user={user} />
      <Settings user={user} />
    </div>
  );
}
