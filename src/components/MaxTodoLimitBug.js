import React, { useState } from 'react';
import DeleteBug2 from './DeleteBug2';

const MaxTodoLimitBug = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const [checkedTodos, setCheckedTodos] = useState({});

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 20) {
      alert('You are exceeding the character limit!');
      setTodoValue(inputValue.slice(0, 10));
    } else {
      setTodoValue(inputValue);
    }
  };

  const addTodo = () => {
    if (todos.length >= 100) {
      alert('Maximum limit of 15 todo items reached!');
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
    const newTodo = { id: newId, text: todoValue };

    setTodos([...todos, newTodo]);
    setCheckedTodos({ ...checkedTodos, [newId]: false }); 
    setTodoValue(''); 
  };

  const deleteTodo = (idToDelete) => {
    // Filter out the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  };


  const toggleTodoColor = (id) => {
    setCheckedTodos({ ...checkedTodos, [id]: !checkedTodos[id] });
  };

  return (
    <div className="todo-container">
      <h2 className="title">Todo List (Maximum limit: 10)</h2>
      <input
        type="textbox"
        value={todoValue}
        onChange={handleInputChange}
        placeholder="Enter todo text"
        className="todo-input"
        required
      />
      <button onClick={addTodo} className="add-button" required>Add Todo</button>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${checkedTodos[todo.id] ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={checkedTodos[todo.id]}
              onChange={() => toggleTodoColor(todo.id)}
              className="todo-checkbox"
              required
            />
            <span className="todo-text">{todo.text}</span>
            <li key={todo.id}>
            {todo.text}
            {/* Pass the todo's id to deleteTodo */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaxTodoLimitBug;
