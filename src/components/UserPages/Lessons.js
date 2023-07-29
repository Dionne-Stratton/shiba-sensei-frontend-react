import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Lessons(props) {
  const { user, setUser, vocab } = props;
  const [addVocab, setAddVocab] = useState([]);
  const [userLessons, setUserLessons] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const history = useHistory();
  let nextArrow = ">";

  useEffect(() => {
    if (user.user_lessons && vocab.length > 0 && userLessons.length === 0) {
      let userLessons = vocab.filter((word) =>
        user.user_lessons.includes(word._id)
      );
      setUserLessons(userLessons);
      setCurrentWord(userLessons[0]);
    }
    if (userLessons.length > 0) {
      setCurrentWord(userLessons[0]);
    }
    //eslint-disable-next-line
  }, [user, vocab, addVocab]);

  function getNextWord() {
    setAddVocab([
      ...addVocab,
      { _id: currentWord._id, rank: 0, lesson_number: currentWord.lesson },
    ]);
    userLessons.shift();
  }

  function submitVocab() {
    let newVocab = [
      ...addVocab,
      { _id: currentWord._id, rank: 0, lesson_number: currentWord.lesson },
    ];
    userLessons.shift();

    axiosWithAuth
      .put("profile", {
        user_vocab: [...user.user_vocab, ...newVocab],
        user_lessons: userLessons,
      })
      .then((res) => {
        console.log("res:", res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        history.push("/");
      });
  }

  return (
    <div className="main-page">
      {currentWord ? (
        <div className="lesson-box">
          <div className="lesson-text">
            <h2>{currentWord.hebrew}</h2>
            <h4>{currentWord.hebrew_with_nikkud}</h4>
            <h4>{currentWord.reading}</h4>
            <h4>{currentWord.meaning}</h4>
          </div>
          <div
            className="next-arrow"
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
