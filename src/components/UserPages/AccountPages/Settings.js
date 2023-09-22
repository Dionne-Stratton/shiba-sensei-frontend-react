import React from "react";
import { useState, useEffect } from "react";

export default function Settings(props) {
  const [withKana, setWithKana] = useState(localStorage.getItem("withKana"));
  const [withPronunciation, setWithPronunciation] = useState(
    localStorage.getItem("withPronunciation")
  );

  useEffect(() => {
    let kana = withKana;
    let pronunciation = withPronunciation;
    if (kana === "false") {
      kana = false;
    } else {
      kana = true;
    }
    if (pronunciation === "false") {
      pronunciation = false;
    } else {
      pronunciation = true;
    }
    setWithKana(kana);
    setWithPronunciation(pronunciation); //eslint-disable-next-line
  }, []);

  onchange = (e) => {
    if (e.target.name === "withKana") {
      setWithKana(e.target.checked);
    }
    if (e.target.name === "withPronunciation") {
      setWithPronunciation(e.target.checked);
    }
    localStorage.setItem("withKana", withKana);
    localStorage.setItem("withPronunciation", withPronunciation);
  };

  return (
    <div className="main-page settings">
      <h2>Settings:</h2>
      <h3>Japanese Reviews:</h3>
      <div>
        <div className="settings-kana">
          <label htmlFor="withKana">With Kana:</label>
          <input
            type="checkbox"
            name="withKana"
            checked={withKana}
            onChange={onchange}
          />
        </div>
        <div className="settings-pronunciation">
          <label htmlFor="withPronunciation">With Pronunciation:</label>
          <input
            type="checkbox"
            name="withPronunciation"
            checked={withPronunciation}
            onChange={onchange}
          />
        </div>
      </div>
    </div>
  );
}
