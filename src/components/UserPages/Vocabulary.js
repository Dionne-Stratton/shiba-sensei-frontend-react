import React, { useEffect, useState } from "react";

export default function Vocabulary(props) {
  const { vocab, selectedLesson, setSelectedLesson } = props;
  const [vocabLessons, setVocabLessons] = useState([]);
  const [availableLessons, setAvailableLessons] = useState([]);

  useEffect(() => {
    // Get all unique lesson numbers from vocab
    if (vocab.length > 0) {
      const uniqueLessons = [...new Set(vocab.map((item) => item.lesson))].sort(
        (a, b) => a - b
      );
      setAvailableLessons(uniqueLessons);
    }

    // Filter vocab by selected lesson
    if (vocab.length > 0 && selectedLesson !== "" && selectedLesson !== "Select") {
      let filteredVocab = vocab.filter((vocabItem) => {
        return vocabItem.lesson === Number(selectedLesson);
      });
      // Sort by lesson number, then by _id for consistent ordering
      filteredVocab.sort((a, b) => {
        if (a.lesson !== b.lesson) return a.lesson - b.lesson;
        return a._id.localeCompare(b._id);
      });
      setVocabLessons(filteredVocab);
    } else {
      setVocabLessons([]);
    }
    //eslint-disable-next-line
  }, [vocab, selectedLesson]); //run this function when vocab or selected lesson changes

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
        <option value="Select" onClick={handleClick}>
          Select a Set
        </option>
        {availableLessons.map((item) => {
          return (
            <option value={item} onClick={handleClick}>
              Level {item}
            </option>
          );
        })}
      </select>
      {/* if a lesson is selected, display the vocab words from that lesson number */}
      <h2>Vocabulary Set {selectedLesson ? selectedLesson : null}</h2>
      {vocabLessons.length === 0 && ( //if vocab lessons is empty display loading
        <p>Loading... Please select a set level.</p>
      )}
      <div className="vocab-page">
        {vocabLessons.map((vocabItem) => {
          return (
            <div className="vocab-words" key={vocabItem._id}>
              <div className="vocab-left">
                <p>
                  {vocabItem.kanji //if the word has kanji, display it next to the kana with "/" in between, otherwise display the kana only
                    ? `${vocabItem.kanji} / ${vocabItem.kana}`
                    : vocabItem.kana}
                </p>
              </div>
              <div className="vocab-right">
                <p>
                  {vocabItem.meaning}
                  {vocabItem.gender ? ` (${vocabItem.gender[0]})` : ""}
                  {/* if there is a gender on the vocab word show only the first letter in () otherwise don't display anything */}
                </p>
                <p>"{vocabItem.reading}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
