import React, { Fragment, useRef, useState } from "react";
import Task from "./components/Task";

import "./App.css";
import Archived from "./components/Archived";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormElement) {
    e.preventDefault();
    if (newTask) {
      addTask(newTask);
      setNewTask("");
    }
    taskInput.current?.focus()
  }

  function addTask(name: string) {
    let newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  function handleCheck(i: number) {
    let newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={taskInput}
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          autoFocus
        />
        <input type="submit" value="⏎" />
      </form>
      <div className="containerTasks">
        {tasks.map((task: ITask, i) => (
          <Fragment key={i}>
          {
            !task.done ?
            <Task {...task} check={()=> handleCheck(i)} />
            : ''
          }
          </Fragment>
        ))}
      </div>
      <Archived tasks={tasks} toReturn={handleCheck} />
    </>
  );
}

export default App;
