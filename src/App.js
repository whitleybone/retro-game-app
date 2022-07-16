import React, { useState } from "react";
import "./App.css";
import PlaySound from "./components/PlaySound.js";

function App() {
  // Properties

  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
        "What inspired game maker Satoshi Tajiri to create the character Pokemon?",
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
      text: "How many worlds are there in Super Mario Bros 3",
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

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

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
            <h2>Current Score: {score}</h2>
          </header>
          <section>
            <h2>
              Question {currentQuestion + 1} out of {questions.length}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].text}</h3>
            <ul>
              {questions[currentQuestion].options.map((option) => {
                return (
                  <li
                    onClick={() => optionClicked(option.isCorrect)}
                    key={option.id}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
      <section>
        <div className="play-sound">
          <PlaySound
            url="https://www.vgmsite.com/soundtracks/super-mario-bros/jlgsgtpeof/01%20Running%20About.mp3"
            label="SuperMario"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
