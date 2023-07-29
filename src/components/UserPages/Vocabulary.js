import React, { useEffect, useState } from "react";

export default function Vocabulary(props) {
  const { vocab, selectedLesson } = props;
  const [vocabLessons, setVocabLessons] = useState([]);

  useEffect(() => {
    if (vocab.length > 0 && selectedLesson !== "") {
      console.log("vocab: ", vocab);
      let vocabLessons = vocab.filter((vocabItem) => {
        return vocabItem.lesson === selectedLesson;
      });
      console.log("Here");
      console.log("Vocabulary.js: useEffect: vocabLessons: ", vocabLessons);
      setVocabLessons(vocabLessons);
    }
    console.log("Vocabulary.js: useEffect: selectedLesson: ", selectedLesson);
  }, [selectedLesson]);

  return (
    <div className="main-page">
      <h2>Vocabulary Lesson {selectedLesson}</h2>
      {vocabLessons.length === 0 && (
        <p>Loading... Please select a lesson number.</p>
      )}
      Vocabulary: {vocabLessons.length}
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
