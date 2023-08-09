import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, availableReviews, getAvailableReviews } = props;
  const [nextAvailableReview, setNextAvailableReview] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user.user_vocab) {
      getAvailableReviews();
      if (user.user_vocab.length > 0) {
        getNextReview();
        reviewsProgress();
      }
    } //eslint-disable-next-line
  }, [user, nextAvailableReview]);

  function reviewsProgress() {
    let vocab = user.user_vocab;
    let totalWords = vocab.length;
    let lessonNumber = user.available_lesson;
    // console.log("lessonNumber:", lessonNumber);
    // console.log("vocab:", vocab);
    //get the number of words rank 3 or higher from current next lessons number
    let wordsToReview = vocab.filter((word) => word.rank >= 3);
    //filter out words that are not in the current lesson
    wordsToReview = wordsToReview.filter(
      (word) => word.lesson_number === lessonNumber
    ).length;
    // console.log("wordsToReview", wordsToReview);
    // console.log(wordsToReview.length);
    let progress = wordsToReview / totalWords;
    setProgress(progress);
    // return progress;
  }

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
    //convert from military time to standard time
    let currentTime = new Date().toString();
    currentTime = currentTime.slice(0, 21);
    //convert date to integer
    let nextReviewCompare = new Date(nextReview).getTime() / 1000;
    let currentTimeCompare = new Date(currentTime).getTime() / 1000;
    //compare the two dates
    if (nextReviewCompare <= currentTimeCompare) {
      nextReview = "now";
      setNextAvailableReview(nextReview);
      return;
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
    }
    if (hourInt === 0) {
      hourInt = 12;
    }
    hour = hourInt.toString();
    nextReview =
      nextReview.slice(3, 10) + ", " + hour + nextReview.slice(18) + amPm;
    setNextAvailableReview(nextReview);
  }

  return (
    <div className="main-page">
      {user.user_vocab ? (
        <div className="dashboard-box">
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
          <div className="progress-bar">
            <p>Mastery: </p>
            <div className="progress">
              <div
                className="progress-done"
                style={{ width: `${progress * 100}%` }}
              >
                {/* {Math.floor(progress * 100)}% */}
              </div>
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
