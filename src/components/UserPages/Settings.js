import React from "react";
import { useState, useEffect } from "react";

export default function Settings(props) {
  const [withNikkud, setWithNikkud] = useState(
    localStorage.getItem("withNikkud")
  );
  const [withPronunciation, setWithPronunciation] = useState(
    localStorage.getItem("withPronunciation")
  );

  useEffect(() => {
    let nikkud = withNikkud;
    let pronunciation = withPronunciation;
    if (nikkud === "false") {
      nikkud = false;
    } else {
      nikkud = true;
    }
    if (pronunciation === "false") {
      pronunciation = false;
    } else {
      pronunciation = true;
    }
    setWithNikkud(nikkud);
    setWithPronunciation(pronunciation);
  }, []);

  onchange = (e) => {
    if (e.target.name === "withnikkud") {
      setWithNikkud(e.target.checked);
    }
    if (e.target.name === "withPronunciation") {
      setWithPronunciation(e.target.checked);
    }
    localStorage.setItem("withNikkud", withNikkud);
    localStorage.setItem("withPronunciation", withPronunciation);
  };

  return (
    <div className="main-page">
      <h2>Settings Page</h2>
      <h3>Hebrew Review:</h3>
      <div className="settings">
        <div className="settings-nikkud">
          <label htmlFor="withnikkud">With Nikkud:</label>
          <input
            type="checkbox"
            name="withnikkud"
            checked={withNikkud}
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
