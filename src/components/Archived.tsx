import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import "./assets/Archived.css";

interface ITask {
  name: string;
  done: boolean;
}

interface IProps {
  tasks: ITask[];
  toReturn: any;
}

export default function Archived(props: IProps): JSX.Element {
  const [modal, setModal] = useState<boolean>(false);

  let handleOpen = () => {
    setModal(true);
  }

  let handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <button onClick={handleOpen} className="btnArchived">
        &#128465;
      </button>
      {modal
        ? createPortal(
            <div className="archivedContainer">
              <button onClick={handleClose}>✗</button>
              {props.tasks.map((t: ITask, i) => (
                <Fragment key={i}>
                  {t.done ? (
                    <div className="archived">
                      <span>{t.name}</span>
                      <button onClick={() => props.toReturn(i)}>⮌</button>
                    </div>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}
            </div>,
            document.getElementById("modal") as HTMLElement
          )
        : ""}
    </>
  );
}
