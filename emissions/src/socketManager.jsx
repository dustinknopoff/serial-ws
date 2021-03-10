import React, { useState, useRef, useEffect } from "react";

// From https://stackoverflow.com/a/60161181
export function socketManager() {
  const [data, setData] = React.useState(0);
  //   const [buffer, setBuffer] = React.useState([]);
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
      if (buffer.current.length <= 3) {
        buffer.current = [...buffer.current, message];
      } else {
        const average =
          buffer.current.reduce((acc, current) => {
            return acc + current;
          }, 0) / buffer.current.length;
        setData(average);
        buffer.current = [];
      }
    };
  }, [isPaused]);

  return [data];
}
