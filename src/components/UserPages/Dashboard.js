import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, availableReviews, getAvailableReviews } = props;
  const [nextAvailableReview, setNextAvailableReview] = useState("");

  useEffect(() => {
    if (user.user_vocab) {
      getAvailableReviews();
      getNextReview();
    } //eslint-disable-next-line
  }, [user, nextAvailableReview]);

  function getNextReview() {
    let vocab = user.user_vocab;
    let nextReview;
    for (let i = 1; i < vocab.length; i++) {
      //find the next review date that is the soonest
      if (vocab[i].next_review < vocab[i - 1].next_review) {
        nextReview = vocab[i].next_review;
      }
    }
    nextReview = new Date(nextReview).toString();
    nextReview = nextReview.slice(0, 21);
    //convert from military time to standard time
    let currentTime = new Date().toString();
    currentTime = currentTime.slice(0, 21);
    if (nextReview <= currentTime) {
      nextReview = "now";
    }
    let hour = nextReview.slice(16, 18);
    let hourInt = parseInt(hour);
    let amPm;
    if (hourInt < 12) {
      amPm = "am";
    }
    if (hourInt >= 12) {
      amPm = "pm";
    }
    if (hourInt > 12) {
      hourInt -= 12;
      hour = hourInt.toString();
      nextReview =
        nextReview.slice(3, 11) + "- " + hour + nextReview.slice(18) + amPm;
    }
    setNextAvailableReview(nextReview);
  }

  // console.log("availableReviews:", availableReviews);

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
          <p className="next-review">
            Next available Review: {nextAvailableReview}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
