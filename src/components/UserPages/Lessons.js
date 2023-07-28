import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Lessons(props) {
  const { user, setUser, vocab } = props;
  const [addVocab, setAddVocab] = useState([]);
  const [userLessons, setUserLessons] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (user.user_lessons && vocab.length > 0 && userLessons.length === 0) {
      let userLessons = vocab.filter((word) =>
        user.user_lessons.includes(word._id)
      );
      setUserLessons(userLessons);
      setCurrentWord(userLessons[0]);
    }
    if (userLessons.length > 0) {
      // console.log("I exist");
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

  // console.log("user:", user);
  // console.log("vocab:", vocab);
  // console.log("userLessons:", userLessons);
  // console.log("currentWord:", currentWord);
  // console.log("addVocab:", addVocab);

  function submitVocab() {
    let newVocab = [
      ...addVocab,
      { _id: currentWord._id, rank: 0, lesson_number: currentWord.lesson },
    ];
    userLessons.shift();
    // console.log("userLessons submit:", userLessons);
    // let lessonsToPut;
    // let lessonToPut;
    // if (userLessons.length === 0) {
    //   // console.log("I'm here", userLessons);
    //   lessonToPut = user.next_lesson + 1;
    //   // console.log("lessonToPut:", lessonToPut);
    //   lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
    //   // console.log("lessonsToPut:", lessonsToPut);
    // } else {
    //   lessonToPut = user.next_lesson;
    //   // console.log("I'm here else", userLessons);
    //   lessonsToPut = userLessons;
    // }
    // console.log("newVocab:", newVocab);
    axiosWithAuth
      .put("profile", {
        user_vocab: [...user.user_vocab, ...newVocab],
        user_lessons: userLessons,
        // next_lesson: lessonToPut,
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
          <h3>{currentWord.meaning}</h3>
          <h4>{currentWord.reading}</h4>
          <h4>
            {currentWord.hebrew} / {currentWord.hebrew_with_nikkud}
          </h4>
          <button
            onClick={() =>
              userLessons.length > 1 ? getNextWord() : submitVocab()
            }
          >
            Next
          </button>
        </div>
      ) : (
        <p>No Lesson Available</p>
      )}
    </div>
  );
}
