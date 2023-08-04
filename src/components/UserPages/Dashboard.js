import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, vocab } = props;

  useEffect(() => {}, [vocab, user]);

  function availableReviews() {
    let reviews = user.user_vocab.filter((word) => {
      let today = new Date();
      let nextReview = new Date(word.next_review);
      return nextReview <= today;
    });
    console.log("reviews:", reviews);
    return reviews.length;
  }
  const availableReviewsLength = availableReviews();

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
                <h3>Reviews: {availableReviewsLength}</h3>
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
