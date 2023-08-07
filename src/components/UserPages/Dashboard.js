import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, availableReviews, getAvailableReviews } = props;
  const [nextAvailableReview, setNextAvailableReview] = useState("");

  useEffect(() => {
    if (user.user_vocab) {
      getAvailableReviews();
      if (user.user_vocab.length > 0) {
        getNextReview();
      }
    } //eslint-disable-next-line
  }, [user, nextAvailableReview]);

  function getNextReview() {
    let vocab = user.user_vocab;
    let nextReview = vocab[0].next_review;
    for (let i = 1; i < vocab.length; i++) {
      //find the next review date that is the soonest
      if (vocab[i].next_review < nextReview) {
        nextReview = vocab[i].next_review;
      }
    }
    nextReview = new Date(nextReview).toString();
    nextReview = nextReview.slice(0, 21);
    // console.log("nextReview:", nextReview);
    //convert from military time to standard time
    let currentTime = new Date().toString();
    currentTime = currentTime.slice(0, 21);
    // console.log("currentTime:", currentTime);
    //convert date to integer
    let nextReviewCompare = new Date(nextReview).getTime() / 1000;
    let currentTimeCompare = new Date(currentTime).getTime() / 1000;
    console.log("nextReview:", nextReviewCompare);
    console.log("currentTime:", currentTimeCompare);
    //compare the two dates
    if (nextReviewCompare <= currentTimeCompare) {
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
  // let roundedDate = new Date(Math.floor()).getTime() / 1000);
  // let roundedDate = new Date(Math.floor(new Date().getTime() / 1000) * 1000);

  // console.log("availableReviews:", availableReviews);
  console.log("nextAvailableReview:", nextAvailableReview);
  // console.log("new Date():", new Date().toString());
  // console.log("new date rounded down:", roundedDate);
  // console.log("new date rounded down:", new Date(roundedDate).toString());

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
          {nextAvailableReview ? (
            <p className="next-review">
              Next available Review: {nextAvailableReview}
            </p>
          ) : (
            <p className="next-review">Go do some lessons!</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
