import React from "react";

export default function Vocabulary(props) {
  const { vocab } = props;
  return (
    <div className="main-page">
      <h2>Unlocked Vocabulary</h2>
      <div className="vocab-page">
        {vocab.length === 0 && <p>Loading...</p>}
        {vocab.map((vocabItem) => {
          return (
            <div className="vocab-words" key={vocabItem._id}>
              {/* <p>Lesson: {vocabItem.lesson}</p> */}
              <h4>{vocabItem.meaning}</h4>
              <h4>{vocabItem.reading}</h4>
              <h4>
                {vocabItem.hebrew_with_nikkud} / {vocabItem.hebrew}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
