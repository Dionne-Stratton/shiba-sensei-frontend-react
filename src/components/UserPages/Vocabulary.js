import React, { useEffect, useState } from "react";

export default function Vocabulary(props) {
  const { vocab, selectedLesson, setSelectedLesson } = props;
  const [vocabLessons, setVocabLessons] = useState([]);

  useEffect(() => {
    if (vocab.length > 0 && selectedLesson !== "") {
      if (selectedLesson !== "select") {
        setSelectedLesson(Number(selectedLesson));
      }
      let vocabLessons = vocab.filter((vocabItem) => {
        return vocabItem.lesson === selectedLesson;
      });
      setVocabLessons(vocabLessons);
    } //eslint-disable-next-line
  }, [selectedLesson]);

  return (
    <div className="main-page">
      {/* <select
            className="main-nav select"
            name="lesson-select"
            onClick={handleClick}
          >
            <option value="select" onClick={handleClick}>
              Vocabulary
            </option>
            <option value="1" onClick={handleClick}>
              Lesson 1
            </option>
            <option value="2" onClick={handleClick}>
              Lesson 2
            </option>
            <option value="3" onClick={handleClick}>
              Lesson 3
            </option>
          </select> */}
      <h2>Vocabulary Lesson {selectedLesson ? selectedLesson : null}</h2>
      {vocabLessons.length === 0 && (
        <p>Loading... Please select a lesson number.</p>
      )}
      <div className="vocab-page">
        {vocabLessons.map((vocabItem) => {
          return (
            <div className="vocab-words" key={vocabItem._id}>
              <div className="vocab-left">
                <h4>
                  {vocabItem.hebrew_with_nikkud} / {vocabItem.hebrew}
                </h4>
                <p>{vocabItem.gender}</p>
              </div>
              <div className="vocab-right">
                <p>{vocabItem.meaning}</p>
                <p>{vocabItem.reading}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
