import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Lessons(props) {
  const { user, setUser, vocab } = props;
  const [addVocab, setAddVocab] = useState([]);
  const [index, setIndex] = useState(0);
  const [lessonCount, setLessonCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    if (user.next_lesson && vocab) {
      let userLessons = vocab.filter(
        (word) => word.lesson === user.next_lesson
      );
      console.log("userLessons:", userLessons);
      if (userLessons.length > 0) {
        setCurrentWord(userLessons[index]);
        setLessonCount(userLessons.length);
      }
    }
  }, [currentWord, index, user.next_lesson, vocab]);

  function getNextWord(index) {
    setIndex(index + 1);
    setCurrentWord(index + 1);
  }

  return (
    <div className="main-page">
      {currentWord.meaning ? (
        <div className="lesson-box">
          <h3>{currentWord.meaning}</h3>
          <h4>{currentWord.reading}</h4>
          <h4>
            {currentWord.hebrew} / {currentWord.hebrew_with_nikkud}
          </h4>
          <button
            disabled={index + 1 >= lessonCount}
            onClick={() => getNextWord(index)}
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
