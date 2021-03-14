import React, { useEffect } from "react";
import "./App.css";
import mic from "./mic.svg";
import { motion, useAnimation } from "framer-motion";
import { Results } from "./Results";

export function SlidesDisplay({
  slide,
  indexChanger,
  quizType,
  data,
  setGuess,
  guesses,
}) {
  const typeQ = quizType === "collective" ? "U.S." : "your";
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: 1,
      transition: {
        type: "spring",
        velocity: 12,
        stiffness: 700,
        damping: 80,
      },
    });
  }, [slide]);

  if (slide.text) {
    return (
      <React.Fragment>
        <motion.div animate={{ scale: 2 }}>
          <button
            className="onlyText"
            onClick={() => indexChanger((current) => current + 1)}
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
        <motion.div animate={controls} variants={variants}>
          <h1 className="h1">
            What percent of <b className="type-q">{typeQ}</b> emissions are
            caused by{" "}
            <i className="category">{slide.personalCat || slide.category}</i>{" "}
            production?
          </h1>
        </motion.div>
        <div className="microphone">
          <label htmlFor="mic">
            Blow or yell into the microphone to make a guess
          </label>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span
              style={{
                height: `${Math.trunc(data)}%`,
                width: "15px",
                background: "red",
                borderRadius: "13px",
              }}
            ></span>
            <div className="microphone-info">
              <img
                name="mic"
                src={mic}
                width="80vw"
                style={{ marginRight: "-50px" }}
              />
              <span className="percentCount">{Math.trunc(data)}%</span>
            </div>
          </div>
          <button
            className="submit"
            onClick={() => {
              setGuess((guesses) => {
                guesses[slide.personalCat || slide.category] = data;
                return guesses;
              });
              indexChanger((current) => current + 1);
            }}
          >
            OK
          </button>
        </div>
      </React.Fragment>
    );
  }

  if (slide.final) {
    return <Results guesses={guesses} quizType={quizType} />;
  }

  return <p>Nothing</p>;
}

const variants = {
  initial: { y: 100 },
  loaded: { y: 0 },
};
