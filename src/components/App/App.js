import { useState, useEffect } from 'react';
import './App.css';
import CreateTodoForm from '../CreateTodoForm/CreateTodoForm';
import TodoList from '../TodoList/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../utils/api';

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

  const handleUpdateTodo = async (id, updatedTodo) => {
    const data = await updateTodo(id, updatedTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === data._id ? data : todo))
    );
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
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
