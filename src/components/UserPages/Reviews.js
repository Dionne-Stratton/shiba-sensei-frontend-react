import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Reviews(props) {
  const { user, setUser, vocab } = props;
  const [rankVocab, setRankVocab] = useState([]);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      let idFiltered = user.user_vocab.map((word) => word._id);
      // console.log("idFiltered:", idFiltered);
      let userVocab = vocab.filter((word) => idFiltered.includes(word._id));
      // console.log("userVocab inside useeffect:", userVocab);
      // console.log("user.user_vocab inside useeffect:", user.user_vocab);
      setUserVocab(userVocab);
      setCurrentWord(userVocab[0]);
    }
    if (userVocab.length > 0) {
      // console.log("I exist");
      setCurrentWord(userVocab[0]);
    } //eslint-disable-next-line
  }, [user, vocab, rankVocab]);

  function getNextWord() {
    let replacementIndex = user.user_vocab.findIndex(
      (word) => word._id === currentWord._id
    );
    console.log("replacementIndex:", replacementIndex);
    setRankVocab([...rankVocab, { _id: currentWord._id, rank: 2 }]);
    userVocab.shift();
  }

  // console.log("user:", user);
  // console.log("vocab:", vocab);
  // console.log("userVocab:", userVocab);
  // console.log("currentWord:", currentWord);
  // console.log("rankVocab:", rankVocab);

  function submitVocab() {
    let newVocab = [...rankVocab, { _id: currentWord._id, rank: 2 }];
    userVocab.shift();
    console.log("userLessons submit:", userVocab);
    let vocabToPut;
    let lessonToPut;
    let rankToPut;
    let lessonsToPut;
    if (userVocab.length === 0) {
      console.log("I'm here", userVocab);
      lessonToPut = user.next_lesson + 1;
      console.log("lessonToPut:", lessonToPut);
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
      console.log("lessonsToPut:", lessonsToPut);
    } else {
      lessonToPut = user.next_lesson;
      lessonsToPut = [];
    }
    console.log("newVocab:", newVocab);
    axiosWithAuth
      .put("profile", {
        user_vocab: [...user.user_vocab, ...newVocab],
        user_lessons: lessonsToPut,
        next_lesson: lessonToPut,
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
              userVocab.length > 1 ? getNextWord() : submitVocab()
            }
          >
            Next
          </button>
        </div>
      ) : (
        <p>No Reviews Available</p>
      )}
    </div>
  );
}
