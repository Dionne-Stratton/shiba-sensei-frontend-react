import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, vocab } = props;

  const userLessons = vocab.filter((word) => word.lesson === user.next_lesson);
  let num_lessons = userLessons.length;
  let num_reviews = user.user_vocab.length;

  console.log("dashboard vocab:", vocab);
  console.log("dashboard userLessons:", userLessons);
  console.log("dashboard user:", user);

  return (
    <div className="main-page">
      <h2>Welcome, {user.user_name}!</h2>
      <p>Level: {user.user_level}</p>
      <div className="lessons-reviews-box">
        <div className="lessons-box">
          <NavLink to="/lessons">
            <h3>Lessons: {num_lessons}</h3>
          </NavLink>
        </div>

        <div className="reviews-box">
          <NavLink to="/reviews">
            <h3>Reviews: {num_reviews}</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
