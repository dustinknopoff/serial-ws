import React, { useState, useEffect } from "react";
import { socketManager } from "./socketManager";
import { slides } from "./slides";
import { SlidesDisplay } from "./slidesDisplay";
import "./App.css";
import Globe from "./globe.jsx";
import User from "./user.jsx";

const initialGuessState = {
  collective: {
    agriculture: 0,
    transportation: 0,
    "commercial, industry, residential": 0,
    "electricity generation": 0,
  },
  personal: {
    transportation: 0,
    "electricity generation": 0,
    "gas, fuel oil, and propane": 0,
    agriculture: 0,
  },
};

function App() {
  const [index, setIndex] = useState(0);
  const [data, quizType] = socketManager();
  const [guesses, setGuesses] = useState(initialGuessState[quizType]);

  useEffect(() => {
    setIndex(0);
    setGuesses(initialGuessState[quizType]);
  }, [quizType]);

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
        quizType={quizType}
        data={data}
        setGuess={setGuesses}
        guesses={guesses}
      />
    </div>
  );
}

export default App;
