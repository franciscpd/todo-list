import React from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [text, setText] = React.useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    setTodos([...todos, { id: todos.length + 1, text, completed: false }]);
    setText("");
  };

  const handleRemoveTodo = (e, id) => {
    e.preventDefault();

    if (window.confirm('Confirma a remoção da tarefa?'))  {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container">
      <h1>Lista de tarefas</h1>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          onChange={handleChangeText}
          value={text}
        />
        <legend>Pressione enter para incluir</legend>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              onClick={() => handleToggle(todo.id)}
              checked={todo.completed}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            <a
              href="remove-todo"
              onClick={(e) => {
                handleRemoveTodo(e, todo.id);
              }}
            >
              Remover
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
