import React, { useState, useRef, useEffect } from "react";

// From https://stackoverflow.com/a/60161181
export function socketManager() {
  const [data, setData] = React.useState(0);
  const [quizType, setQuizType] = React.useState("personal");
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);
  const buffer = useRef([]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      if (message === "personal" || message === "collective") {
        setQuizType(() => message);
        return;
      }
      if (buffer.current.length <= 9) {
        buffer.current = [...buffer.current, message];
      } else {
        const average = median(buffer.current);
        setData(average);
        buffer.current = [];
      }
    };
  }, [isPaused]);

  return [data, quizType];
}

function median(values) {
  values.sort(function (a, b) {
    return a - b;
  });

  if (values.length === 0) return 0;

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];
  else return (values[half - 1] + values[half]) / 2.0;
}
