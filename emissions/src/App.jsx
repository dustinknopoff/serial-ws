import React, { useState } from "react";
import { socketManager } from "./socketManager";
import { slides } from "./slides";
import { SlidesDisplay } from "./slidesDisplay";
import "./App.css";
import Globe from "./globe.jsx";
import User from "./user.jsx";

const initialGuessState = {
  personal: {
    residential: 0,
    commercial: 0,
    industry: 0,
    "electricity generation": 0,
    transportation: 0,
  },
  collective: {
    residential: 0,
    commercial: 0,
    industry: 0,
    "electricity generation": 0,
    transportation: 0,
  },
};

function App() {
  const [index, setIndex] = useState(0);
  const [data, quizType] = socketManager();
  const [guesses, setGuesses] = useState(initialGuessState);
  // console.log(guesses);
  return (
    <div className="gentle-flex container">
      <div>
        {quizType === "personal" ? (
          <button className={`type-toggle active`}>
            <User className="svg-image" color={"black"} />
            Individual
          </button>
        ) : (
          <button className={`type-toggle active`}>
            <Globe className="svg-image" color={"black"} />
            Collective
          </button>
        )}
      </div>
      <SlidesDisplay
        slide={slides[index]}
        indexChanger={setIndex}
        isCollective={quizType}
        data={data}
        setGuess={setGuesses}
        guesses={guesses}
      />
    </div>
  );
}

export default App;

//<span>Count: {Math.trunc(data)}</span>
