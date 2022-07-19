import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PlaySound from "./Components/PlaySound.js";

function App() {
  // Properties

  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //Question Color
  const [questionColor, setQuestionColor] = useState(false);

  const [colorForMultiple, setcolorForMultiple] = useState(false);

  //Correct Answer ID
  const [answerID, setAnswerID] = useState(0);

  //cursor
  const [cursor, setCursor] = useState(0);

  //Correct answers
  const successMessage = useRef();

  //Tab click
  const [indexOfTab, setIndexOfTab] = useState(0);

  const [onKeyPressing, setOnKeyPress] = useState(false);

  // useEffect for setting color for multiple answers

  useEffect(() => {
    setcolorForMultiple(false);
  }, [showFinalResults]);

  const questions = [
    {
      text: "Mario first appeared in what classic game?",
      options: [
        { id: 0, text: "Super Mario Bros.", isCorrect: false },
        { id: 1, text: "Donkey Kong", isCorrect: true },
        { id: 2, text: "The Legend of Zelda", isCorrect: false },
        { id: 3, text: "Mario Kart", isCorrect: false }
      ]
    },
    {
      text:
        "What creature inspired game maker Satoshi Tajiri to create Pokemon?",
      options: [
        { id: 0, text: "Butterflies", isCorrect: true },
        { id: 1, text: "Caterpillars", isCorrect: false },
        { id: 2, text: "Ladybugs", isCorrect: false },
        { id: 3, text: "Grasshoppers", isCorrect: false }
      ]
    },
    {
      text:
        "What is the maximum number of rupees you can obtain in The Legend of Zelda?",
      options: [
        { id: 0, text: "325", isCorrect: false },
        { id: 1, text: "140", isCorrect: false },
        { id: 2, text: "480", isCorrect: false },
        { id: 3, text: "255", isCorrect: true }
      ]
    },
    {
      text: "How many worlds are there in Super Mario Bros 3?",
      options: [
        { id: 0, text: "5", isCorrect: false },
        { id: 1, text: "7", isCorrect: false },
        { id: 2, text: "9", isCorrect: true },
        { id: 3, text: "6", isCorrect: false }
      ]
    },
    {
      text:
        "Which two games were originally sold with the NES system when it was released in 1985?",
      options: [
        { id: 0, text: "Super Mario Bros.", isCorrect: false },
        { id: 1, text: "Gyromite", isCorrect: true },
        { id: 2, text: "Tetris", isCorrect: false },
        { id: 3, text: "Duckhunt", isCorrect: true }
      ]
    }
  ];

  // Helper Functions.

  const optionClicked = (isCorrect, optionID) => {
    setAnswerID(optionID);
    // console.log("Hey iD before", optionID);

    let multipleAnswers = 0;
    let correctAnswers = 0;

    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
      if (questions[currentQuestion].options[i].isCorrect === true) {
        multipleAnswers++;
      }
    }

    if (multipleAnswers === 2) {
      setcolorForMultiple(true);
      correctAnswers = correctAnswers + 2;
    } else {
      correctAnswers = correctAnswers + 1;
    }

    if (correctAnswers === 1) {
      setQuestionColor(true);

      setTimeout(() => {
        if (isCorrect) {
          setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setFinalResults(true);
        }
        setOnKeyPress(false);
        setQuestionColor(false);
      }, 2000);
    } else if (correctAnswers === 2 && colorForMultiple === true) {
      setQuestionColor(true);
      setTimeout(() => {
        if (isCorrect) {
          setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setFinalResults(true);
        }
        setOnKeyPress(false);
        setQuestionColor(false);
      }, 2000);
    } else {
      console.log("onKeyPressing", onKeyPressing);
      setOnKeyPress(false);

      // alert("Please select multiple answers.", onKeyPressing);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

  //Keyboard Accessibility

  const keyHandler = (isCorrect, optionID) => {
    // setIndexOfTab(indexOfTab + 1);
    console.log("onFocusHandler", indexOfTab);
    optionClicked(isCorrect, optionID);
    console.log("ArrowUp", isCorrect, optionID);
  };

  useEffect(() => {
    const listener = (e) => {
      e.preventDefault();
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        keyHandler2(e);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [cursor]);

  // console.log("cursor value:", cursor);

  const keyHandler2 = (e) => {
    console.log("cursor value:", cursor);

    if (e.key === "ArrowUp" && cursor > 0) {
      setCursor(cursor - 1);
    } else if (
      e.key === "ArrowDown" &&
      cursor < questions[currentQuestion].options.length - 1
    ) {
      setCursor(cursor + 1);
    } else if (e.key === "Enter") {
      setOnKeyPress(true);
      console.log("\nSetting keyPress == True", onKeyPressing);
    }
  };

  // --------------------------------------------------

  return (
    <div className="App">
      {showFinalResults ? (
        /* Final Results Card */
        <div className="final-results">
          <header>
            <h1>Final Results</h1>
          </header>
          <main>
            <h2>
              {score} out of {questions.length} correct - (
              {(score / questions.length) * 100}%)
            </h2>
            <img
              className="giphy"
              src="SuperMarioGif.gif"
              alt="Super Mario Gif"
            ></img>
            <p className="giphy-link">
              <a href="https://giphy.com/gifs/nintendo-20Mmcse81nQ38dSwvo">
                via GIPHY
              </a>
            </p>
          </main>
          <button onClick={() => restartGame()}>Play Again</button>
        </div>
      ) : (
        /* Question Card */
        <div className="quiz-card">
          <header>
            <h1>Retro Gaming Quiz</h1>
            <h4>
              <em>Use your mouse or arrow/enter keys</em>
            </h4>
            <h2>Current Score: {score}</h2>
          </header>
          <section>
            <h2>
              Question {currentQuestion + 1} out of {questions.length}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].text}</h3>

            <ul ref={successMessage}>
              {questions[currentQuestion].options.map((option, i) => {
                return questionColor ? (
                  <>
                    <li
                      onClick={() => optionClicked(option.isCorrect, option.id)}
                      key={option.id}
                      className={
                        option.isCorrect === true ? "isGreen" : "isRed"
                      }
                    >
                      {option.text}
                    </li>
                  </>
                ) : colorForMultiple ? (
                  <>
                    <li
                      onClick={() => optionClicked(option.isCorrect, option.id)}
                      key={option.id}
                      className={
                        option.id === answerID
                          ? "selectedAnswer"
                          : "" || cursor === i
                          ? "active"
                          : null
                      }
                    >
                      {option.text}
                      {/* {cursor === i && keyHandler(option.isCorrect, option.id)} */}
                    </li>
                  </>
                ) : onKeyPressing ? (
                  <>{cursor === i && keyHandler(option.isCorrect, option.id)}</>
                ) : (
                  <>
                    <li
                      onClick={() => optionClicked(option.isCorrect, option.id)}
                      key={option.id}
                      className={cursor === i ? "active" : null}
                    >
                      {option.text}
                    </li>
                  </>
                );
              })}
            </ul>
          </section>
        </div>
      )}
      <div>
        <div className="play-sound">
          <PlaySound
            url="https://www.vgmsite.com/soundtracks/super-mario-bros/jlgsgtpeof/01%20Running%20About.mp3"
            label="SuperMario"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
