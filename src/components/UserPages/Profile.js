import React, { useEffect, useState } from "react";

export default function Profile(props) {
  const { user } = props;

  console.log("profile user", user);
  return (
    <div className="main-page profile">
      <h2>Profile:</h2>
      <h4>User Name: {user.user_name}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Level: {user.user_level}</h4>
    </div>
  );
}
