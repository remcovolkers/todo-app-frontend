import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { fetchTodos, updateTodo, deleteTodo } from '../utils/api';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        };

        fetchData();
    }, []);

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

    const handleUpdate = async (id, updatedTodo) => {
        await updateTodo(id, updatedTodo);
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    return (
        <div>
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default TodoList;