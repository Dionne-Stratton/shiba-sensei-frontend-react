import React from "react";

export default function Profile(props) {
  const { user } = props;

  return (
    <div className="main-page profile">
      <h2>Profile:</h2>
      <h4>Email: {user.email}</h4>
      <h4>Most recent lesson: {user.available_lesson}</h4>
    </div>
  );
}
