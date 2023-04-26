import { useState, useEffect } from 'react';
import './App.css';
import { fetchTodos, createTodo, sendTodo } from '../../utils/api';
import TodoItem from '../Todo/TodoItem';
import { useCallback } from 'react';
import CreateTodoForm from '../Todo/CreateTodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    fetchData();
  }, []);

  const updateTodoInState = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const deleteTodoFromState = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };
  const addTodoToState = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <CreateTodoForm addTodoToState={addTodoToState} />
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodoInState={updateTodoInState}
            deleteTodoFromState={deleteTodoFromState}
          />
        ))}
      </div>
    </div>
  );
}

export default App;