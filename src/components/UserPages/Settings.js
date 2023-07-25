import React from "react";

export default function Settings(props) {
  return (
    <div className="main-page settings">
      <h2>Settings Page</h2>
      <h3>Hebrew Review:</h3>
      <label>
        With Nikkud:
        <input className="checkbox" type="checkbox" />
      </label>
    </div>
  );
}
