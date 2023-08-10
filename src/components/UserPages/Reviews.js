import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Auth/axiosWithAuth";

export default function Reviews(props) {
  const {
    user,
    setUser,
    vocab,
    setShowNav,
    availableReviews,
    getAvailableReviews,
  } = props;
  const [rankVocab, setRankVocab] = useState(0);
  const [userVocab, setUserVocab] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [removedWord, setRemovedWord] = useState({});
  const [message, setMessage] = useState("");
  const [correctMeaning, setCorrectMeaning] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answer, setAnswer] = useState("");
  const [meaningType, setMeaningType] = useState(true);
  const history = useHistory();

  let nextArrow = ">";
  let regexPattern = /[^A-Za-z]/g;

  useEffect(() => {
    setShowNav(false); // disable the nav bar while on the review page
    //if the user has vocab and there is vocab available to review and the user vocab has not been set
    if (user.user_vocab && vocab.length > 0 && userVocab.length === 0) {
      setMessage(""); //reset the message
      if (availableReviews.length > 0) {
        //if there are available reviews
        let idFiltered = availableReviews.map((word) => word._id); //create an array of the ids of the available reviews
        let userVocab = vocab.filter((word) => idFiltered.includes(word._id));
        //filter the vocab to only include words that are in the available reviews array of ids

        randomizeArray(userVocab); //randomize the order of the reviews
        setUserVocab(userVocab); //set the user vocab to the randomized array
        setCurrentWord(userVocab[0]); //set the current word to the first word in the array
        let correctMeaningArray = userVocab[0].meaning //create an array of the correct meanings of the word by splitting the string of meanings and removing any non-alphabetical characters and converting to lowercase
          .split(", ")
          .map((word) => word.toLowerCase().replace(regexPattern, ""));

        setCorrectMeaning(correctMeaningArray);
      } else {
        getAvailableReviews();
      }
    }
    if (userVocab.length > 0) {
      //if there is user vocab
      setCurrentWord(userVocab[0]); //set the current word to the first word in the array
      let correctAnswerArray = userVocab[0].meaning //create an array of the correct meanings of the word by splitting the string of meanings and removing any non-alphabetical characters and converting to lowercase
        .split(", ")
        .map((word) => word.toLowerCase().replace(regexPattern, ""));
      setCorrectMeaning(correctAnswerArray);
    } //eslint-disable-next-line
  }, [user, vocab, removedWord, message]); //if the user, vocab, removedWord, or message changes, run this useEffect

  //function to add a certain number of hours to the current time based on the rank of the word
  // for rank 1 +2 hours, rank 2 +4 hours, rank 3 +8 hours, rank 4 +24 hours, rank 5 +48 hours, rank 6 +1 week, rank 7 +2 weeks, rank 8 +1 month, rank 9 +2 months, rank 10 +4 months, rank 11 +6 months, rank 12 = "burned"
  function addHoursByRank(date, rank) {
    let hours;
    switch (rank) {
      case 0:
        hours = 0;
        break;
      case 1:
        hours = 0.1;
        break;
      case 2:
        hours = 4;
        break;
      case 3:
        hours = 8;
        break;
      case 4:
        hours = 24;
        break;
      case 5:
        hours = 48;
        break;
      case 6:
        hours = 168;
        break;
      case 7:
        hours = 336;
        break;
      case 8:
        hours = 720;
        break;
      case 9:
        hours = 1440;
        break;
      case 10:
        hours = 2880;
        break;
      case 11:
        hours = 4320;
        break;
      default:
        hours = 0;
    }
    return new Date(date.getTime() + hours * 60 * 60 * 1000); //add the hours to the date and return the new date
  }

  //function to round the time to the nearest minute
  function roundTimeMinutes(time) {
    let timeToReturn = new Date(time);
    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    );
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    return timeToReturn;
  }

  function randomizeArray(array) {
    let currentIndex = array.length; //set the current index to the length of the array
    let randomIndex;
    let tempValue;
    while (currentIndex !== 0) {
      //while the current index is not 0
      randomIndex = Math.floor(Math.random() * currentIndex); //set the random index to a random number between 0 multiplied by the current index
      currentIndex--; //decrement the current index
      tempValue = array[currentIndex]; //set the temp value to the value of the item at the current index of the array passed in
      array[currentIndex] = array[randomIndex]; //set the value of the item at the current index of the array passed in to the value of the item at the random index
      array[randomIndex] = tempValue; //set the value of the item at the random index to the temp value. this swaps the two values thus randomizing the array
    }
    return array;
  }

  function handleChange(e) {
    if (!message) {
      //if there is no message then set the answer to the value of the input
      setAnswer(e.target.value);
    } else {
      //otherwise set the answer to the value of the input so that the answer cannot be changed after the message is set
      setAnswer(answer);
    }
  }

  function checkAnswer() {
    let answerToUse = answer.toLowerCase().trim(); //convert the answer to lowercase and remove any whitespace
    answerToUse = answerToUse.replace(regexPattern, ""); //remove any non-alphabetical characters
    let message;
    if (meaningType) {
      //if the meaning type is true
      if (correctMeaning.includes(answerToUse)) {
        //if the correct meaning array includes the answer to use then the answer is correct otherwise it is incorrect
        message = "correct";
      } else {
        message = "incorrect";
      }
      setMessage(message); //set the message to correct or incorrect
    } else {
      //if the meaning type is false then the answer is the reading
      if (answerToUse === currentWord.reading) {
        //if the answer to use is the same as the reading then the answer is correct otherwise it is incorrect
        message = "correct";
      } else {
        message = "incorrect";
      }
      setMessage(message); //set the message to correct or incorrect
    }
    //if the answer is correct then set the rank change to 1, if the answer is incorrect set it to -1
    let rankChange = message === "correct" ? 1 : "incorrect" ? -1 : 0;
    setRankVocab(rankChange);
  }

  function getNextWord() {
    let allVocab = user.user_vocab; //set the all vocab to the user vocab array
    if (!message) {
      return allVocab; //if there is no message then return the all vocab array
    }
    setQuestionsAnswered(questionsAnswered + 1); //increment the questions answered
    setMessage(""); //reset the message

    let replacementIndex = allVocab.findIndex(
      //find the index of the word to be replaced
      (word) => word._id === currentWord._id //by comparing the id of the current word to the id of the word in the all vocab array
    );
    let wordRank = allVocab[replacementIndex].rank; //set the word rank to the rank of the word to be replaced
    let newRank = wordRank < 1 && rankVocab < 0 ? 0 : wordRank + rankVocab; //if the word rank is less than 1 and the rank vocab is less than 0 then set the new rank to 0 otherwise set it to the word rank plus the rank vocab
    let newDate = addHoursByRank(new Date(), newRank); //set the new date to the current date plus the hours based on the new rank of the word using the add hours by rank function
    newDate = roundTimeMinutes(newDate); //round the new date to the nearest minute
    allVocab[replacementIndex].next_review = newDate; //set the next review date of the word to be replaced to the new date
    allVocab[replacementIndex].rank = newRank; //set the rank of the word to be replaced to the new rank
    setRemovedWord(userVocab.shift()); //remove the word from the user vocab array and set it to the removed word
    setAnswer(""); //reset the answer
    return allVocab;
  }

  async function submitVocab() {
    //if there is no current word or no questions answered then return to the dashboard and show the nav bar, doing nothing else
    // if (!currentWord.lesson || (!message && questionsAnswered === 0)) {
    //   history.push("/");
    //   setShowNav(true);
    //   return;
    // }
    let allVocab = await getNextWord(); //get the next word
    let lessonFiltered = allVocab.filter(
      //filter the all vocab array to only include words from the current lesson
      (word) => word.lesson_number === user.available_lesson
    );
    let rankFiltered = lessonFiltered.filter((word) => word.rank > 2); //filter the lesson filtered array to only include words with a rank greater than 2
    let lessonToPut;
    let lessonsToPut;
    // lessonsToPut = vocab.filter((word) => word.lesson === user.available_lesson);
    //if the number of words with a rank greater than 2 is greater than or equal to 80% of the number of words in the current lesson then set the lesson to put to the current lesson number plus 1 and set the lessons to put to the vocab filtered to only include words from the lesson to put number
    if (rankFiltered.length / lessonFiltered.length >= 0.8) {
      lessonToPut = user.available_lesson + 1;
      lessonsToPut = vocab.filter((word) => word.lesson === lessonToPut);
    } else {
      //otherwise set the lesson to put to the current lesson number and set the lessons to put to the set of user lessons thus not changing the lesson number or adding any new lessons
      lessonToPut = user.available_lesson;
      lessonsToPut = user.user_lessons;
    }

    history.push("/"); //push to the dashboard
    setShowNav(true); //show the nav bar
    console.log("lessonsToPut:", lessonsToPut);
    console.log("vocab:", vocab);
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
        <p className="toggle" onClick={() => setMeaningType(!meaningType)}>
          {meaningType ? "Reading" : "Meaning"}
          {/* //toggle between reading and meaning */}
        </p>
      </div>
      {userVocab.length > 0 ? ( //if there is user vocab
        <div className="review-box">
          <div className="review-header">
            {meaningType ? (
              <div className="review-meaning">
                <h2>
                  {currentWord.hebrew}
                  {currentWord.hebrew_with_nikkud
                    ? ` /${currentWord.hebrew_with_nikkud}`
                    : ""}
                  {/* //if the word has nikkud then display the word with nikkud otherwise display the word without nikkud */}
                </h2>
                <h4>"{currentWord.reading}"</h4>
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
                meaningType ? "Enter the meaning" : "Enter the reading"
              }
              name="answer"
              type="text"
              value={answer}
              onChange={handleChange}
              onKeyDown={(e) =>
                //if the user presses enter and there is user vocab and the message is true then get the next word
                //if the user presses enter and there is user vocab and the message is false then check the answer
                //if the user presses enter and there is no user vocab then submit the vocab
                //otherwise do nothing
                e.key === "Enter" && userVocab.length > 1 && message
                  ? getNextWord()
                  : e.key === "Enter" && !message
                  ? checkAnswer()
                  : e.key === "Enter"
                  ? submitVocab()
                  : null
              }
            />
            <div
              className="message"
              onClick={() =>
                //when this div is clicked
                //if there is user vocab and the message is true then get the next word
                //if there is user vocab and the message is false then check the answer
                //if there is no user vocab then submit the vocab
                userVocab.length > 1 && message
                  ? getNextWord()
                  : userVocab.length > 0 && !message
                  ? checkAnswer()
                  : submitVocab()
              }
            >
              {nextArrow}
            </div>
          </div>
          {message && meaningType ? (
            <div className="correctAnswer">
              <h3>
                {currentWord.meaning}
                {currentWord.gender ? ` (${currentWord.gender[0]})` : ""}
                {/* //if the current word has a gender then display the first letter of the gender in parentheses after the meaning otherwise display nothing */}
              </h3>
            </div>
          ) : message && !meaningType ? (
            <div className="correctAnswer">
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
