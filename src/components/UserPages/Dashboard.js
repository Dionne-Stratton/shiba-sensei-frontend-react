import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, availableReviews, getAvailableReviews } = props;

  useEffect(() => {
    if (user.user_vocab) {
      getAvailableReviews();
    } //eslint-disable-next-line
  }, [user]);

  console.log("availableReviews:", availableReviews);

  return (
    <div className="main-page">
      {user.user_vocab ? (
        <div className="dashboard-box">
          <h2>Welcome, {user.email}!</h2>
          <div className="lessons-reviews-box">
            <div className="lessons-box">
              <NavLink to="/lessons">
                <h3>Lessons: {user.user_lessons.length}</h3>
              </NavLink>
            </div>

            <div className="reviews-box">
              <NavLink to="/reviews">
                <h3>Reviews: {availableReviews.length}</h3>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
