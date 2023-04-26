import React, { useState } from 'react';
import { createTodo } from '../../utils/api';
import './CreateTodoForm.css'

const CreateTodoForm = ({ addTodoToState }) => {
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const handleChange = (e) => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setNewTodo({
            ...newTodo,
            completed: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdTodo = await createTodo(newTodo);
        addTodoToState(createdTodo);
        setNewTodo({ title: '', description: '', completed: false });
    };

    return (
        <form className="create-todo-form" onSubmit={handleSubmit}>
            <label>
                Title: {" "}
                <input type="text" name="title" value={newTodo.title} onChange={handleChange} required />
            </label>
            <label>
                {" "} Description:
                <input type="text" name="description" value={newTodo.description} onChange={handleChange} />
            </label>
            <label>
                {" "} Completed:
                <input type="checkbox" name="completed" checked={newTodo.completed} onChange={handleCheckboxChange} />
            </label>
            <button type="submit">{" "}Add Todo</button>
        </form>
    );
};

export default CreateTodoForm;
