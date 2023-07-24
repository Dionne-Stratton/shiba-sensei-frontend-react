import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = ({ user_name, user_level, num_lessons, num_reviews }) => {
  user_name = "testuser";
  user_level = 1;
  num_lessons = 10;
  num_reviews = 20;

  return (
    <div className="main-page">
      <h2>Welcome, {user_name}!</h2>
      <p>Your Current Level: {user_level}</p>

      <div className="lessons-box">
        <NavLink to="/lessons">
          <h3>Lessons</h3>
          <p>Number of Vocabulary Available: {num_lessons}</p>
        </NavLink>
      </div>

      <div className="reviews-box">
        <NavLink to="/reviews">
          <h3>Reviews</h3>
          <p>Number of Vocabulary Available: {num_reviews}</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
