import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";

export default function Account(props) {
  return (
    <div className="main-page">
      <Profile />
      <Settings />
    </div>
  );
}
