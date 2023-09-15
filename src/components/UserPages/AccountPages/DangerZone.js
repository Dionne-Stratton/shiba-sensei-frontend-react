import React from "react";

export default function DangerZone(props) {
  const { user } = props;

  return (
    <div className="main-page danger-zone">
      <h1>Danger Zone:</h1>
      {/* button to reset account progress */}
      <button className="danger">Reset Progress</button>
      {/* button to delete account */}
      <button className="danger">Delete Account</button>
    </div>
  );
}
