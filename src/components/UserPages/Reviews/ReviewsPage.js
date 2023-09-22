import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../Auth/axiosWithAuth";
import {
  nextArrow,
  regexEnglishPattern,
  regexKanaPattern,
  kanaConvertingTable,
} from "./ReviewsDataSets";
import {
  randomizeArray,
  nextWord,
  checkLanguageMatch,
  checkAnswer,
  splitReviews,
  checkPair,
} from "./ReviewsFunctions";

export default function Reviews(props) {
  const {
    user,
    setUser,
    vocab,
    setShowNav,
    availableReviews,
    getAvailableReviews,
    combineArrays,
  } = props;
  const [rankVocab, setRankVocab] = useState(0);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [removedWord, setRemovedWord] = useState({});
  const [message, setMessage] = useState("");
  const [matched, setMatched] = useState(false);
  const [correctMeaning, setCorrectMeaning] = useState([]);
  const [correctReading, setCorrectReading] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionType, setQuestionType] = useState("");
  const history = useHistory();
  const withKana = localStorage.getItem("withKana");
  const withPronunciation = localStorage.getItem("withPronunciation");
  const [reviewsLeft, setReviewsLeft] = useState(0);

  useEffect(() => {
    setShowNav(false); // disable the nav bar while on the review page
    //if the user has vocab and there is vocab available to review and the user vocab has not been set
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      //this block is only run once when the page loads
      setMessage(""); //reset the message
      if (availableReviews.length > 0) {
        setReviewsLeft(availableReviews.length);
        //if there are available reviews
        let userVocab = combineArrays(availableReviews, vocab); //combine the user vocab and the vocab into one array
        userVocab = splitReviews(userVocab); //split the reviews into meaning and reading reviews
        randomizeArray(userVocab); //randomize the order of the reviews
        console.log("userVocab:", userVocab);
        setUserVocab(userVocab); //set the user vocab to the randomized array
        setCurrentWord(userVocab[0]); //set the current word to the first word in the array
        setQuestionType(userVocab[0].questionType); //set the meaning type to false
        let correctMeaningArray = userVocab[0].meaning //create an array of the correct meanings of the word by splitting the string of meanings and removing any non-alphabetical characters and converting to lowercase
          .split(", ")
          .map((word) => word.toLowerCase().replace(regexEnglishPattern, ""));
        setCorrectMeaning(correctMeaningArray);
        let correctReadingArray = userVocab[0].kana //create an array of the correct readings of the word by splitting the string of readings and removing any non-alphabetical characters and converting to lowercase
          .split(", ")
          .map((word) => word.replace(regexKanaPattern, ""));
        setCorrectReading(correctReadingArray);
      } else {
        getAvailableReviews();
      }
    }
    if (userVocab.length > 0) {
      //if there is user vocab
      setCurrentWord(userVocab[0]); //set the current word to the first word in the array
      setQuestionType(userVocab[0].questionType); //set the meaning type to false
      let correctAnswerArray = userVocab[0].meaning //create an array of the correct meanings of the word by splitting the string of meanings and removing any non-alphabetical characters and converting to lowercase
        .split(", ")
        .map((word) => word.toLowerCase().replace(regexEnglishPattern, ""));
      setCorrectMeaning(correctAnswerArray);
      let correctReadingArray = userVocab[0].kana //create an array of the correct readings of the word by splitting the string of readings and removing any non-alphabetical characters and converting to lowercase
        .split(", ")
        .map((word) => word.replace(regexKanaPattern, ""));
      setCorrectReading(correctReadingArray);
    } //eslint-disable-next-line
  }, [user, vocab, removedWord, message]); //if the user, vocab, removedWord, or message changes, run this useEffect

  function handleChange(e) {
    let { value } = e.target;
    if (value) {
      value = value.toLowerCase();
    }
    console.log("value:", value);
    if (message) {
      //if there is no message then set the answer to the value of the input
      setAnswer(answer);
    }
    if (!message && questionType === "reading" && value) {
      //if the value has english letters then create a variable to store just the english
      //then use findindex to check if they match any romaji
      //in the kanaConvertingTable and if they do then replace them with the kana
      //then set the answer to the value of the input
      let englishLetters = value.match(regexKanaPattern);
      if (englishLetters) {
        let englishString = englishLetters.join("");
        let index = kanaConvertingTable.findIndex(
          (letter) => letter.romaji === englishString
        );
        console.log("index:", index);
        if (index > -1) {
          value = value.replace(englishString, kanaConvertingTable[index].kana);
        }
        console.log("valueNew:", value);
      }
      setAnswer(value);
    } else {
      setAnswer(value);
    }
  }

  function onCheckAnswer() {
    let message = checkAnswer(
      answer,
      questionType,
      correctReading,
      correctMeaning
    ); //check the answer
    setMessage(message); //set the message to correct or incorrect
    //if the answer is correct then set the rank change to 1, if the answer is incorrect set it to -1
    // let rankChange = message === "correct" ? 1 : "incorrect" ? -1 : 0;
    let { rankAdjustment, isMatch } = checkPair(currentWord, message);
    setMatched(isMatch);
    if (rankAdjustment < 1) {
      setRankVocab(-1);
    } else {
      setRankVocab(1);
    }
  }

  function getNextWord() {
    let allVocab = user.user_vocab; //set the all vocab to the user vocab array
    if (!message) {
      return allVocab; //if there is no message then return the all vocab array
    }
    setQuestionsAnswered(questionsAnswered + 1); //increment the questions answered
    setMessage(""); //reset the message
    if (matched) {
      setReviewsLeft(reviewsLeft - 1);
      allVocab = nextWord(allVocab, rankVocab, currentWord); //get the next word
    }
    setRemovedWord(userVocab.shift()); //remove the word from the user vocab array and set it to the removed word
    setAnswer(""); //reset the answer
    return allVocab;
  }

  async function submitVocab() {
    checkPair(currentWord, "reset");
    console.log("submitVocab");
    //if there is no current word or no questions answered then return to the dashboard and show the nav bar, doing nothing else
    if (!currentWord.questionType || (!message && questionsAnswered === 0)) {
      history.push("/");
      setShowNav(true);
      return;
    }
    let allVocab = await getNextWord(); //get the next word
    let lessonFiltered = vocab.filter(
      //filter the all vocab array to only include words from the current lesson
      (word) => word.lesson_number === user.available_lesson
    );
    let rankFiltered = lessonFiltered.filter((word) => word.rank > 2); //filter the lesson filtered array to only include words with a rank greater than 2
    let lessonToPut;
    let lessonsToPut;
    //if the number of words with a rank greater than 2 is greater than or equal to 80% of the number of words in the current lesson then set the lesson to put to the current lesson number plus 1 and set the lessons to put to the vocab filtered to only include words from the lesson to put number
    if (rankFiltered.length / lessonFiltered.length >= 0.8) {
      lessonToPut = user.available_lesson + 1;
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
      lessonsToPut = [...lessonsToPut, ...user.user_lessons];
    } else {
      //otherwise set the lesson to put to the current lesson number and set the lessons to put to the set of user lessons thus not changing the lesson number or adding any new lessons
      lessonToPut = user.available_lesson;
      lessonsToPut = user.user_lessons;
    }

    history.push("/"); //push to the dashboard
    setShowNav(true); //show the nav bar
    axiosWithAuth //put the user with the updated vocab and lessons
      .put("profile", {
        user_vocab: allVocab,
        user_lessons: lessonsToPut,
        available_lesson: lessonToPut,
      })
      .then((res) => {
        console.log("res:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="main-page">
      <div className="review-nav">
        <p className="no-header-dashboard-button" onClick={submitVocab}>
          Dashboard
        </p>
        <p className="toggle">Reviews Left: {reviewsLeft}</p>
      </div>
      {userVocab.length > 0 ? ( //if there is user vocab
        <div className="review-box">
          <div className="review-header">
            {questionType === "meaning" ? (
              <div className="review-meaning">
                <h2>{currentWord.kanji}</h2>
                {withKana === "true" ? (
                  <h3>{currentWord.kana}</h3>
                ) : withKana === "false" && currentWord.kanji === "" ? (
                  <h3>{currentWord.kana}</h3>
                ) : null}
                {
                  withPronunciation === "true" ? (
                    <h4>"{currentWord.reading}"</h4>
                  ) : null //if the rank vocab is less than 3 then display the reading otherwise display nothing
                }
              </div>
            ) : (
              <div className="review-reading">
                <h2>
                  {currentWord.meaning}
                  {currentWord.gender ? ` (${currentWord.gender[0]})` : ""}
                  {/* //if the current word has a gender then display the first letter of the gender in parentheses after the meaning otherwise display nothing */}
                </h2>
              </div>
            )}
          </div>
          <div
            className={
              //if the message is correct then the input box is green, if the message is incorrect then the input box is red, otherwise the input box is neutral
              message === "correct"
                ? "correct"
                : message === "incorrect"
                ? "incorrect"
                : "neutral"
            }
          >
            <input
              className="answer-input"
              autoFocus="autofocus"
              placeholder={
                //if the meaning type is true then the placeholder is "Enter the meaning" otherwise it is "Enter the reading"
                questionType === "meaning"
                  ? "Enter the meaning"
                  : "Enter the reading"
              }
              name="answer"
              type="text"
              value={answer}
              onChange={handleChange}
              onKeyDown={
                (e) =>
                  e.key === "Enter" && !checkLanguageMatch(answer, questionType) //if the answer does not match the language then do nothing
                    ? null
                    : e.key === "Enter" && userVocab.length > 1 && message //if the user presses enter and there is user vocab and the message is true then get the next word
                    ? getNextWord()
                    : e.key === "Enter" && !message //if the user presses enter and the message is false then check the answer
                    ? onCheckAnswer()
                    : e.key === "Enter" //if the user presses enter and there is no user vocab then submit the vocab
                    ? submitVocab()
                    : null //otherwise do nothing
              }
            />
            <div
              className="message"
              onClick={
                () =>
                  !checkLanguageMatch(answer, questionType) //if the answer does not match the language then do nothing
                    ? null
                    : userVocab.length > 1 && message //if there is user vocab and the message is true then get the next word
                    ? getNextWord()
                    : userVocab.length > 0 && !message //if there is user vocab and the message is false then check the answer
                    ? onCheckAnswer()
                    : submitVocab() //if there is no user vocab then submit the vocab
              }
            >
              {nextArrow}
            </div>
          </div>
          {message && questionType === "meaning" ? (
            <div className="correctAnswer">
              <h3>
                {currentWord.meaning}
                {currentWord.gender ? ` (${currentWord.gender[0]})` : ""}
                {/* //if the current word has a gender then display the first letter of the gender in parentheses after the meaning otherwise display nothing */}
              </h3>
            </div>
          ) : message && questionType === "reading" ? (
            <div className="correctAnswer">
              {currentWord.kanji && <h3>{currentWord.kanji}</h3>}
              <h3>{currentWord.kana}</h3>
              <h3>{currentWord.reading}</h3>
            </div>
          ) : null}
        </div>
      ) : (
        //if there is no user vocab then display the message "No Reviews Available"
        <p>No Reviews Available</p>
      )}
    </div>
  );
}
