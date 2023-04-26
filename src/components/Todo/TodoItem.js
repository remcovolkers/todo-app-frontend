import React, { useState } from 'react';
import './TodoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateTodo, deleteTodo } from '../../utils/api';

const TodoItem = ({ todo, updateTodoInState, deleteTodoFromState }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState(todo);

    const handleDelete = async () => {
        await deleteTodo(todo._id);
        deleteTodoFromState(todo._id);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        const updatedTodoData = await updateTodo(todo._id, updatedTodo);
        updateTodoInState(updatedTodoData);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUpdatedTodo({
            ...updatedTodo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setUpdatedTodo({
            ...updatedTodo,
            completed: e.target.checked,
        });
    };

    const handleCompletedChange = async () => {
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        };
        const response = await updateTodo(updatedTodo);
        updateTodoInState(response.data);
    };

    return (
        <div className={`todo-item${todo.completed ? ' completed' : ''}`}>
            {isEditing ? (
                <>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={updatedTodo.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={updatedTodo.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            name="completed"
                            checked={updatedTodo.completed}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </>
            ) : (
                <>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
                </>
            )}

            <div className="todo-item-controls">
                {isEditing ? (
                    <button className="save-button" onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                ) : (
                    <button className="edit-button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
                <button className="delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );

};

export default TodoItem;
