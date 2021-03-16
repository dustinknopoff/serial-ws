import React, { useEffect } from "react";
import { Pie } from "./Pie";
import { realValues } from "./slides";
import { motion } from "framer-motion";

export function Results({ guesses, quizType }) {
  const labels = Object.keys(guesses);
  const diffs = React.useMemo(
    () => constructDiff(guesses, realValues[quizType]),
    [guesses]
  );

  const [index, setIndex] = React.useState(-1);
  const [shownDiffs, setShown] = React.useState([]);
  const dataset = React.useMemo(
    () => Object.keys(guesses).map((cat) => guesses[cat]),
    [guesses]
  );

  useEffect(() => {
    Array.from(document.getElementsByClassName("container")).forEach((el) =>
      el.classList.add("results")
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (index + 1 < diffs.length) {
        setShown((existing) => [...existing, diffs[index + 1]]);
        setIndex((i) => i + 1);
      }
      if (index + 1 == diffs.length) {
        document.getElementById("realPie").scrollIntoView();
      }
    }, 1000);
  }, [index]);

  useEffect(() => {
    console.log("firing new");
  }, [dataset]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Your Guesses</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "70vh",
            width: "70%",
            position: "relative",
          }}
        >
          <Pie labels={labels} dataset={dataset} />
        </div>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={list}
          style={{ listStyle: "none" }}
        >
          {shownDiffs.map(([key, diff, upDown]) => (
            <motion.li key={key} variants={item} style={{ margin: "10px" }}>
              {key} is <b>{diff}%</b> <span className={upDown}>{upDown}</span>{" "}
              on average
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <h1>Breakdown from EPA</h1>
        <div
          style={{
            height: "70vh",
            width: "70%",
            position: "relative",
          }}
          id={"realPie"}
        >
          <Pie
            labels={labels}
            dataset={Object.keys(realValues[quizType]).map(
              (cat) => realValues[quizType][cat]
            )}
          />
        </div>
      </div>
    </div>
  );
}

function constructDiff(guessed, real) {
  let keys = Object.keys(real);
  return keys.map((key) => {
    let guessedVal = guessed[key];
    let realVal = real[key];
    let diff = realVal - guessedVal;
    if (diff < 0) {
      return [key, Math.abs(diff), "lower"];
    } else if (diff > 0) {
      return [key, Math.abs(diff), "higher"];
    }
    if (diff === 0) {
      return [key, Math.abs(diff), "perfect"];
    }
  });
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};
