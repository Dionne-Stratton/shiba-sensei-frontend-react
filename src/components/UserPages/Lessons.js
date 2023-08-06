import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Lessons(props) {
  const { user, setUser, vocab, setShowNav } = props;
  const [index, setIndex] = useState(0);
  const [addVocab, setAddVocab] = useState([]);
  const [userLessons, setUserLessons] = useState([]);
  const [moveLessons, setMoveLessons] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [lessonsViewed, setLessonsViewed] = useState(0);
  const history = useHistory();
  let nextArrow = ">";
  let previousArrow = "<";

  useEffect(() => {
    setShowNav(false);
    if (user.user_lessons && vocab.length > 0 && userLessons.length === 0) {
      let lessons = vocab.filter((word) =>
        user.user_lessons.includes(word._id)
      );
      console.log("userLessons:", userLessons);
      setUserLessons(user.user_lessons);
      setMoveLessons(lessons);
      setCurrentWord(moveLessons[index]);
    }
    if (userLessons.length > 0) {
      setCurrentWord(moveLessons[index]);
    }
    //eslint-disable-next-line
  }, [user, vocab, addVocab, index, userLessons]);

  function getNextWord() {
    if (index < lessonsViewed) {
      setIndex(index + 1);
      return;
    }
    console.log("here");
    setAddVocab([
      ...addVocab,
      {
        _id: currentWord._id,
        rank: 0,
        lesson_number: currentWord.lesson,
        next_review: new Date(),
      },
    ]);
    userLessons.shift();
    setIndex(index + 1);
    setLessonsViewed(lessonsViewed + 1);
  }

  function submitVocab() {
    if (!currentWord || lessonsViewed === 0) {
      history.push("/");
      setShowNav(true);
      return;
    }
    let newVocab = [
      ...addVocab,
      {
        _id: currentWord._id,
        rank: 0,
        lesson_number: currentWord.lesson,
        next_review: new Date(),
      },
    ];
    userLessons.shift();

    axiosWithAuth
      .put("profile", {
        user_vocab: [...user.user_vocab, ...newVocab],
        user_lessons: userLessons,
      })
      .then((res) => {
        console.log("res:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        history.push("/");
        setShowNav(true);
      });
  }

  console.log("userLessons:", userLessons);
  console.log("addVocab:", addVocab);
  console.log("index:", index);
  console.log("lessonsViewed:", lessonsViewed);

  return (
    <div className="main-page">
      <p className="no-header-dashboard-button" onClick={submitVocab}>
        Dashboard
      </p>
      {currentWord ? (
        <div className="lesson-box">
          {index > 0 ? (
            <div className="arrow" onClick={() => setIndex(index - 1)}>
              {previousArrow}
            </div>
          ) : (
            <div className="arrow disabled">{previousArrow}</div>
          )}
          <div className="lesson-text">
            <h2>{currentWord.hebrew}</h2>
            <h4>{currentWord.hebrew_with_nikkud}</h4>
            <h4>"{currentWord.reading}"</h4>
            <h4>
              {currentWord.meaning}
              {currentWord.gender ? ` (${currentWord.gender[0]})` : ""}
            </h4>
          </div>
          <div
            className="arrow"
            onClick={() =>
              userLessons.length > 1 ? getNextWord() : submitVocab()
            }
          >
            {nextArrow}
          </div>
        </div>
      ) : (
        <p>No Lesson Available</p>
      )}
    </div>
  );
}
