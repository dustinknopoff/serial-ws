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
  const [isCollective, setType] = useState("personal");
  const [data] = socketManager();
  const [guesses, setGuesses] = useState(initialGuessState);
  // console.log(guesses);
  return (
    <div className="gentle-flex container">
      <div>
        <button
          className={`type-toggle left ${
            isCollective === "personal" ? "active" : ""
          }`}
          onClick={() => setType("personal")}
        >
          <User
            className="svg-image"
            color={isCollective === "collective" ? "darkgray" : "black"}
          />
          Individual
        </button>
        <button
          className={`type-toggle right ${
            isCollective === "collective" ? "active" : ""
          }`}
          onClick={() => setType("collective")}
        >
          <Globe
            className="svg-image"
            color={isCollective === "personal" ? "darkgray" : "black"}
          />
          Collective
        </button>
      </div>
      <SlidesDisplay
        slide={slides[index]}
        indexChanger={setIndex}
        isCollective={isCollective}
        data={data}
        setGuess={setGuesses}
        guesses={guesses}
      />
    </div>
  );
}

export default App;

//<span>Count: {Math.trunc(data)}</span>
