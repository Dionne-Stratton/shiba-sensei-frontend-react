import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Reviews(props) {
  const { user, setUser, vocab, setShowNav } = props;
  const [rankVocab, setRankVocab] = useState(0);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [removedWord, setRemovedWord] = useState({});
  const [message, setMessage] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answer, setAnswer] = useState("");
  const history = useHistory();

  let nextArrow = ">";

  useEffect(() => {
    setShowNav(false);
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      setMessage("");
      console.log("user:", user);
      console.log("user.user_vocab:", user.user_vocab);
      if (user.user_vocab.length > 0) {
        let idFiltered = user.user_vocab.map((word) => word._id);
        console.log("idFiltered:", idFiltered);
        let userVocab = vocab.filter((word) => idFiltered.includes(word._id));
        setUserVocab(userVocab);
        setCurrentWord(userVocab[0]);
        let correctAnswerArray = userVocab[0].meaning
          .split(", ")
          .map((word) => word.toLowerCase());
        setCorrectAnswer(correctAnswerArray);
      }
    }
    console.log("currentWord:", currentWord);
    if (userVocab.length > 0) {
      setCurrentWord(userVocab[0]);
      let correctAnswerArray = userVocab[0].meaning
        .split(", ")
        .map((word) => word.toLowerCase());
      setCorrectAnswer(correctAnswerArray);
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
    setRankVocab(rankChange);
  }

  function getNextWord() {
    setQuestionsAnswered(questionsAnswered + 1);
    setMessage("");
    let allVocab = user.user_vocab;

    let replacementIndex = allVocab.findIndex(
      (word) => word._id === currentWord._id
    );
    let wordRank = allVocab[replacementIndex].rank;

    let newRank = wordRank < 1 && rankVocab < 0 ? 0 : wordRank + rankVocab;

    allVocab[replacementIndex].rank = newRank;
    setRemovedWord(userVocab.shift());
    setAnswer("");
    return allVocab;
  }

  async function submitVocab() {
    if (!currentWord || questionsAnswered === 0) {
      history.push("/");
      setShowNav(true);
      return;
    }
    let allVocab = await getNextWord();
    let lessonFiltered = allVocab.filter(
      (word) => word.lesson_number === user.available_lesson
    );
    let rankFiltered = lessonFiltered.filter((word) => word.rank > 2);
    let lessonToPut;
    let lessonsToPut;
    if (rankFiltered.length === lessonFiltered.length) {
      lessonToPut = user.available_lesson + 1;
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
    } else {
      lessonToPut = user.available_lesson;
      lessonsToPut = [];
    }

    console.log("allVocab:", allVocab);
    history.push("/");
    setShowNav(true);
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
  }

  return (
    <div className="main-page">
      <p className="no-header-dashboard-button" onClick={submitVocab}>
        Dashboard
      </p>
      {userVocab.length > 0 ? (
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
              name="answer"
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
