import React, { useState } from "react";
import "./App.css";

function TodoForm({ createTodo }) {
  const [task, setTask] = useState("");

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    createTodo(task);
    setTask("");
  }

  return (
    <form>
      <label htmlFor="task">Task</label>
      <input type="text" name="task" value={task} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </form>
  );
}

function TodoItem({ id, task, isComplete, toggleTodo }) {
  const [_isComplete, setIsComplete] = useState(isComplete);

  function handleChange(event) {
    setIsComplete(event.target.checked);
    toggleTodo(id);
  }

  return (
    <li key={id} className="todo-item">
      <label>
        <span className={isComplete ? "complete" : ""}>{task}</span>
        <input
          type="checkbox"
          name="isComplete"
          checked={_isComplete}
          onChange={handleChange}
        />
      </label>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Start React project",
      isComplete: true
    },
    {
      id: 2,
      task: "Cook dinner",
      isComplete: false
    }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  let visibleTodos;
  if (showCompleted) {
    visibleTodos = [...todos];
  } else {
    visibleTodos = todos.filter(todo => !todo.isComplete);
  }

  const nbCompleted = todos.reduce((acc, todo) => {
    if (todo.isComplete) {
      acc += 1;
    }
    return acc;
  }, 0);

  function createTodo(task) {
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = {
      id,
      task: task
    };

    setTodos(todos.concat(newTodo));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      })
    );
  }

  function handleToggleVisiblity(event) {
    setShowCompleted(event.target.checked);
  }

  return (
    <div className="App">
      <div className="todo-app">
        <TodoForm createTodo={createTodo} />
        <label>
          Show completed ({nbCompleted}):
          <input
            type="checkbox"
            name="show-completed"
            checked={showCompleted}
            onChange={handleToggleVisiblity}
          />
        </label>
        <ul>
          {visibleTodos.reverse().map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              task={todo.task}
              isComplete={todo.isComplete}
              toggleTodo={toggleTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
