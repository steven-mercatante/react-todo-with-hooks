import React, { useState } from "react";
import "./App.css";

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          isComplete={todo.isComplete}
        />
      ))}
    </ul>
  );
}

function TodoItem({ id, task, isComplete }) {
  const [_isComplete, setIsComplete] = useState(isComplete);

  function handleChange(event) {
    console.log(event.target.checked);
    setIsComplete(event.target.checked);
  }

  return (
    <li key={id} className="todo-item">
      <label htmlFor="isComplete">
        <span className={_isComplete ? "complete" : ""}>{task}</span>
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

  function createTodo(task) {
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = {
      id: nextId,
      task: task
    };

    setTodos(todos.concat(newTodo));
  }

  function deleteTodo(id) {}

  function toggleTodo(id) {}

  return (
    <div className="App">
      <div className="todo-app">
        <TodoForm createTodo={createTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
