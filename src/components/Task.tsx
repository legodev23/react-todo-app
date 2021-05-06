import React, { useState } from "react";

import "./assets/Task.css";

interface ITaskProps {
  name: string;
  done: boolean;
  check: any;
}

export default function Task({ name, done, check }: ITaskProps): JSX.Element {
  const [delElement, setDelElement] = useState<boolean>(false);

  let handleClick = () => {
    setDelElement(true);
    setTimeout(() => {
      check();
    }, 400);
  };

  return (
    <div
      style={
        delElement
          ? {
              animationName: "done",
              animationDuration: "400ms",
              animationDelay: "200ms",
              animationFillMode: "forwards",
              border: "none",
            }
          : {}
      }
      className="task"
    >
      <div
        className="cleanUp"
        style={
          delElement
            ? {
                animationName: "cleanUp",
                animationDuration: "200ms",
                animationFillMode: "forwards",
              }
            : {}
        }
      />
      <h2 style={{ textDecoration: delElement ? "line-through" : "" }}>
        {name}
      </h2>
      {delElement ? "" : <button onClick={handleClick}>✓</button>}
    </div>
  );
}
