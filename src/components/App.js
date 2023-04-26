import { useState } from 'react';
import '../styles/App.css';
import { fetchTodos, createTodo, sendTodo } from '../utils/api';

function App() {
  const [todo, setTodo] = useState('');

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = {
      title: formData.get('todo'),
      description: '',
      completed: false,
    };
    try {
      const response = await createTodo(newTodo);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ToDo{" "}
          <input type='text' name='todo' value={todo} onChange={handleTodoChange}></input>
        </label>
        <button type='submit'>
          SEND
        </button>
      </form>
    </div>
  );
}

export default App;
