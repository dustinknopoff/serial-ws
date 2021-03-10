import React, { useEffect } from "react";
import "./App.css";
import mic from "./mic.svg";
import { motion, useMotionValue } from "framer-motion";

export function SlidesDisplay({
  slide,
  indexChanger,
  isCollective,
  data,
  setGuess,
  guesses,
}) {
  const typeQ = isCollective === "collective" ? "US" : "your";

  if (slide.text) {
    return (
      <React.Fragment>
        <motion.div animate={{ scale: 2 }}>
          <button
            className="onlyText"
            onClick={() => indexChanger((idx) => idx + 1)}
          >
            {slide.text}
          </button>
        </motion.div>
        <div />
      </React.Fragment>
    );
  }

  if (slide.question) {
    return (
      <React.Fragment>
        <div />
        <motion.div
          initial="initial"
          animate="loaded"
          variants={variants}
          exit={{ opacity: 0 }}
        >
          <h1>
            What percent of <b>{typeQ}</b> emissions are caused by{" "}
            {slide.category} production?
          </h1>
        </motion.div>
        <div className="microphone">
          <label htmlFor="mic">
            Blow or yell into the microphone to make a guess
          </label>
          <div className="microphone-info">
            <img
              name="mic"
              src={mic}
              width="80vw"
              style={{ marginRight: "-50px" }}
            />
            <span className="percentCount">{Math.trunc(data)}%</span>
          </div>
          <button
            className="submit"
            onClick={() => {
              setGuess((guesses) => {
                guesses[isCollective][slide.category] = data;
                return guesses;
              });
              indexChanger((idx) => idx + 1);
            }}
          >
            OK
          </button>
        </div>
      </React.Fragment>
    );
  }

  if (slide.results) {
    <pre></pre>;
  }

  return <p>Nothing</p>;
}

const variants = {
  initial: { y: 100 },
  loaded: { y: 0 },
};
