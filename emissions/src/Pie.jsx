import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

/**
 * Constructs a Pie chart from input
 * @param {number} width width
 * @param {number} height width
 * @param {number[]} dataset data points
 * @param {string[]} labels labels
 * @returns ReactElement
 */
export function Pie({ width, height, dataset, labels }) {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: dataset,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
          },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels,
      }}
    />
  );
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
