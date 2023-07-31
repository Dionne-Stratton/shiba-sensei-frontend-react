import React, { useEffect, useState } from "react";

export default function Vocabulary(props) {
  const { vocab, selectedLesson, setSelectedLesson, user } = props;
  const [vocabLessons, setVocabLessons] = useState([]);
  const [availableLessons, setAvailableLessons] = useState([]);

  useEffect(() => {
    if (vocab.length > 0 && selectedLesson !== "" && user.available_lesson) {
      let vocabLessons = vocab.filter((vocabItem) => {
        return vocabItem.lesson === Number(selectedLesson);
      });
      let testing = Array.from(
        { length: user.available_lesson },
        (_, index) => index + 1
      );
      setAvailableLessons(testing);
      setVocabLessons(vocabLessons);
    } //eslint-disable-next-line
  }, [selectedLesson]);

  const handleClick = (e) => {
    setSelectedLesson(e.target.value);
  };

  return (
    <div className="main-page">
      <select
        className="main-nav select"
        name="lesson-select"
        onClick={handleClick}
        value={selectedLesson}
        onChange={(e) => setSelectedLesson(e.target.value)}
      >
        <option value="select" onClick={handleClick}>
          Select a Lesson
        </option>
        {availableLessons.map((item) => {
          return (
            <option value={item} onClick={handleClick}>
              Lesson {item}
            </option>
          );
        })}
      </select>
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
                  {vocabItem.hebrew_with_nikkud}
                  {vocabItem.hebrew}
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
