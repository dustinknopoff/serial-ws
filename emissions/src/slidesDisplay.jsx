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
  const [countdown, setCountdown] = React.useState(4);

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
    setCountdown(4);
  }, [slide]);

  useEffect(() => {
    setTimeout(() => {
      if (countdown > 0) setCountdown((c) => c - 1);
      console.log(countdown);
    }, 1000);

    if (countdown === 0) {
      if (slide.text) {
        indexChanger((current) => current + 1);
      }
      if (slide.question) {
        setGuess((guesses) => {
          guesses[slide.personalCat || slide.category] = data;
          return guesses;
        });
        indexChanger((current) => current + 1);
      }
    }
  }, [countdown]);

  if (slide.text) {
    return (
      <React.Fragment>
        <motion.div animate={{ scale: 2 }}>
          {countdown === 4 && <span className="onlyText">Ready?</span>}
          {countdown === 1 && <span className="onlyText">{slide.text}</span>}
          {countdown < 4 && countdown > 1 && (
            <span className="onlyText">{countdown}</span>
          )}
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
            Start Yelling! Your guess will be captured in {countdown} seconds
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
          <button className={countdown === 1 ? "submit active" : "submit"}>
            {countdown === 1 && "Captured"}
            {countdown > 1 && countdown}
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
