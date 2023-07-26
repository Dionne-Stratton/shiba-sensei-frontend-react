import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Lessons(props) {
  const { user, setUser, userLessons, vocab } = props;
  const [addVocab, setAddVocab] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [currentSet, setCurrentSet] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user.next_lesson && vocab) {
      if (userLessons.length > 0) {
        //create a subset of lessons called lessonsSet that is the first 5 words of the userLessons array
        let lessonsSet = userLessons.slice(0, 1);
        //set the currentSet to the lessonsSet
        setCurrentSet(lessonsSet);
        //set the currentWord to the first word in the lessonsSet
        setCurrentWord(lessonsSet[0]);
        console.log("lessonsSet:", lessonsSet);
        console.log("currentWord:", currentWord);
        console.log("currentSet:", currentSet);
      }
      // setCurrentWord(newUserLessons[index]);
    }
  }, [currentWord, index, user.next_lesson, vocab]);

  function getNextWord(index) {
    setAddVocab([...addVocab, { _id: currentWord._id, rank: 1 }]);
    setIndex(index + 1);
    setCurrentWord(index + 1);
  }

  console.log("currentSet:", currentSet);

  console.log("currentWord:", currentWord);
  console.log("addVocab:", addVocab);

  function submitVocab() {
    let newVocab = [...addVocab, { _id: currentWord._id, rank: 1 }];
    console.log(token);
    console.log("newVocab:", newVocab);
    axiosWithAuth
      .put("profile", {
        user_vocab: [...user.user_vocab, ...newVocab],
        user_lessons: [user.userLessons],
        // next_lesson: user.next_lesson + 1,
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
              index + 1 < currentSet.length ? getNextWord(index) : submitVocab()
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
