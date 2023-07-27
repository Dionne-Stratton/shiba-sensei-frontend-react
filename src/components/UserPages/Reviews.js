import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Reviews(props) {
  const { user, setUser, vocab } = props;
  // const [rankVocab, setRankVocab] = useState([]);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [removedWord, setRemovedWord] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      let idFiltered = user.user_vocab.map((word) => word._id);
      // console.log("idFiltered:", idFiltered);
      let userVocab = vocab.filter((word) => idFiltered.includes(word._id));
      console.log("userVocab inside useeffect:", userVocab);
      // console.log("user.user_vocab inside useeffect:", user.user_vocab);
      setUserVocab(userVocab);
      setCurrentWord(userVocab[0]);
    }
    console.log("userVocab:", userVocab);
    if (userVocab.length > 0) {
      // console.log("I exist", userVocab);
      console.log("userVocab[0]:", userVocab[0]);
      setCurrentWord(userVocab[0]);
      // console.log("rankVocab:", rankVocab);
    } //eslint-disable-next-line
  }, [user, vocab, removedWord]);

  function getNextWord() {
    let allVocab = user.user_vocab;
    console.log("currentWord:", currentWord);
    let replacementIndex = allVocab.findIndex(
      (word) => word._id === currentWord._id
    );
    allVocab[replacementIndex].rank = allVocab[replacementIndex].rank + 1;
    // console.log("replacementIndex:", replacementIndex);
    console.log("allVocab:", allVocab);
    // setRankVocab(allVocab);
    setRemovedWord(userVocab.shift());
    // setUserVocab(userVocab);
    console.log("userVocab:", userVocab);
    return allVocab;
  }

  // console.log("user:", user);
  // console.log("vocab:", vocab);
  // console.log("userVocab:", userVocab);
  // console.log("currentWord:", currentWord);
  // console.log("rankVocab:", rankVocab);

  async function submitVocab() {
    let allVocab = await getNextWord();
    // console.log("allVocab submit:", allVocab);
    let lessonToPut;
    let lessonsToPut;
    if (userVocab.length === 0) {
      // console.log("I'm here", userVocab);
      lessonToPut = user.next_lesson + 1;
      // console.log("lessonToPut:", lessonToPut);
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
      // console.log("lessonsToPut:", lessonsToPut);
    } else {
      lessonToPut = user.next_lesson;
      lessonsToPut = [];
    }
    axiosWithAuth
      .put("profile", {
        user_vocab: allVocab,
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
