import { useState, useEffect } from 'react';
import './App.css';
import CreateTodoForm from '../CreateTodoForm/CreateTodoForm';
import TodoList from '../TodoList/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../utils/api';
import CompletedTodos from '../CompletedTodos/CompletedTodos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    getTodos();
  }, []);

  const handleCreateTodo = async (newTodo) => {
    const data = await createTodo(newTodo);
    setTodos((prevTodos) => [...prevTodos, data]);
  };

  const handleUpdateTodo = async (id, updatedTodo, delay = 0) => {
    const data = await updateTodo(id, updatedTodo);
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === data._id ? data : todo))
      );
    }, delay);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="App">
      <CreateTodoForm onCreateTodo={handleCreateTodo} />
      <div className="todo-list-container">
        <TodoList
          todos={todos.filter((todo) => !todo.completed)}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
      <CompletedTodos todos={todos.filter((todo) => todo.completed)} onDelete={handleDeleteTodo} />
    </div>
  );
}

export default App;
