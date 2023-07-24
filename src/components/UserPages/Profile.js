import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(props) {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(profile);
  return (
    <div className="main-page">
      <h3>Profile Page</h3>
      <h4>User Name: {profile.user_name}</h4>
      <h4>Email: {profile.email}</h4>
      <h4>Level: {profile.user_level}</h4>
    </div>
  );
}
