import React from "react";

export default function Settings(props) {
  return (
    <div className="main-page">
      <h2>Settings Page</h2>
      <h3>Hebrew Review:</h3>
      <label>
        With Nikkud:
        <input className="checkbox" type="checkbox" />
      </label>
      <label>
        With Reading:
        <input className="checkbox" type="checkbox" />
      </label>
    </div>
  );
}
