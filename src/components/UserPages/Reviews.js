import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Reviews(props) {
  const { user, setUser, vocab } = props;
  const [rankVocab, setRankVocab] = useState(0);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [removedWord, setRemovedWord] = useState({});
  const [message, setMessage] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [answer, setAnswer] = useState("");
  const history = useHistory();

  let nextArrow = ">";

  useEffect(() => {
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      setMessage("");
      let idFiltered = user.user_vocab.map((word) => word._id);
      // console.log("idFiltered:", idFiltered);
      let userVocab = vocab.filter((word) => idFiltered.includes(word._id));
      // console.log("userVocab inside useeffect:", userVocab);
      // console.log("user.user_vocab inside useeffect:", user.user_vocab);
      setUserVocab(userVocab);
      setCurrentWord(userVocab[0]);
      let correctAnswerArray = userVocab[0].meaning
        .split(", ")
        .map((word) => word.toLowerCase());
      // console.log("correctAnswerArray:", correctAnswerArray);
      setCorrectAnswer(correctAnswerArray);
    }
    // console.log("userVocab:", userVocab);
    if (userVocab.length > 0) {
      // console.log("I exist", userVocab);
      // console.log("userVocab[0]:", userVocab[0]);
      setCurrentWord(userVocab[0]);
      let correctAnswerArray = userVocab[0].meaning
        .split(", ")
        .map((word) => word.toLowerCase());
      // console.log("correctAnswerArray:", correctAnswerArray);
      setCorrectAnswer(correctAnswerArray);
      // console.log("rankVocab:", rankVocab);
    } //eslint-disable-next-line
  }, [user, vocab, removedWord, message]);

  function handleChange(e) {
    if (!message) {
      setAnswer(e.target.value);
    } else {
      setAnswer(answer);
    }
  }

  function checkAnswer() {
    let answerToUse = answer.toLowerCase().trim();
    let message;
    if (correctAnswer.includes(answerToUse)) {
      message = "correct";
    } else {
      message = "incorrect";
    }
    setMessage(message);
    let rankChange = message === "correct" ? 1 : "incorrect" ? -1 : 0;
    // console.log("rankChange:", rankChange);
    // console.log("message:", message);
    setRankVocab(rankChange);
  }

  function getNextWord() {
    setMessage("");
    let allVocab = user.user_vocab;
    // console.log("currentWord:", currentWord);

    let replacementIndex = allVocab.findIndex(
      (word) => word._id === currentWord._id
    );
    let wordRank = allVocab[replacementIndex].rank;
    // console.log("wordRank:", wordRank);
    let newRank = wordRank < 1 && rankVocab < 0 ? 0 : wordRank + rankVocab;
    // console.log("newTank:", newRank);
    allVocab[replacementIndex].rank = newRank;
    setRemovedWord(userVocab.shift());
    // console.log("allVocab:", allVocab);
    // console.log("userVocab:", userVocab);
    setAnswer("");
    return allVocab;
  }

  // console.log("user:", user);
  // console.log("vocab:", vocab);
  // console.log("userVocab:", userVocab);
  // console.log("currentWord:", currentWord);
  // console.log("rankVocab:", rankVocab);

  async function submitVocab() {
    let allVocab = await getNextWord();
    let lessonFiltered = allVocab.filter(
      (word) => word.lesson_number === user.available_lesson
    );
    // console.log("lessonFiltered:", lessonFiltered);
    let rankFiltered = lessonFiltered.filter((word) => word.rank > 2);
    // console.log("rankFiltered:", rankFiltered);
    // console.log("allVocab submit:", allVocab);
    let lessonToPut;
    let lessonsToPut;
    if (rankFiltered.length === lessonFiltered.length) {
      // console.log("I'm here", userVocab);
      lessonToPut = user.available_lesson + 1;
      // console.log("lessonToPut:", lessonToPut);
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
      // console.log("lessonsToPut:", lessonsToPut);
    } else {
      lessonToPut = user.available_lesson;
      lessonsToPut = [];
    }
    history.push("/");
    axiosWithAuth
      .put("profile", {
        user_vocab: allVocab,
        user_lessons: lessonsToPut,
        available_lesson: lessonToPut,
      })
      .then((res) => {
        console.log("res:", res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //   history.push("/");
    // });
  }

  return (
    <div className="main-page">
      {currentWord ? (
        <div className="review-box">
          <div className="review-header">
            <h2>{currentWord.hebrew}</h2>
            <h4>{currentWord.hebrew_with_nikkud}</h4>
            <h4>{currentWord.reading}</h4>
          </div>
          <div
            className={
              message === "correct"
                ? "correct"
                : message === "incorrect"
                ? "incorrect"
                : "neutral"
            }
          >
            <input
              className="answer-input"
              autoFocus="autofocus"
              placeholder="Enter Answer"
              type="text"
              value={answer}
              onChange={handleChange}
              onKeyDown={(e) =>
                e.key === "Enter" && userVocab.length > 1 && message
                  ? getNextWord()
                  : e.key === "Enter" && !message
                  ? checkAnswer()
                  : e.key === "Enter"
                  ? submitVocab()
                  : null
              }
            />
            <div
              className="meaning"
              onClick={() =>
                userVocab.length > 1 && message
                  ? getNextWord()
                  : userVocab.length > 1 && !message
                  ? checkAnswer()
                  : submitVocab()
              }
            >
              {nextArrow}
            </div>
          </div>
        </div>
      ) : (
        <p>No Reviews Available</p>
      )}
    </div>
  );
}
