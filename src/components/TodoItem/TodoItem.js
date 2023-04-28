import React, { useState, useEffect } from 'react';
import './TodoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import CustomConfetti from '../CustomConfetti/CustomConfetti';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState(todo);
    const [confetti, setConfetti] = useState(false);

    const handleDelete = async () => {
        onDelete(todo._id);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        onUpdate(todo._id, updatedTodo);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUpdatedTodo({
            ...updatedTodo,
            [e.target.name]: e.target.value,
        });
        console.log(updatedTodo)
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    const handleClick = () => {
        setUpdatedTodo({
            ...updatedTodo,
            completed: !updatedTodo.completed,
        });
        onUpdate(todo._id,
            {
                ...updatedTodo,
                completed: !updatedTodo.completed
            });
        if (!updatedTodo.completed) {
            setConfetti(true);
            setTimeout(() => {
                setConfetti(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (confetti) {
            const audio = document.getElementById('cheering-sound');
            audio.play();
        }
    }, [confetti]);

    return (
        <div className={`todo-item ${updatedTodo.completed ? 'completed' : ''}`}>
            <CustomConfetti active={confetti} />
            <div className="todo-item-content">
                <audio id="cheering-sound" src={`${process.env.PUBLIC_URL}/engineer-job-well-done.mp3`} preload="auto" />
                {isEditing ? (
                    <>
                        <label>
                            Title
                            <input
                                type="text"
                                name="title"
                                value={updatedTodo.title}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <label>
                            Description
                            <input
                                type="text"
                                name="description"
                                value={updatedTodo.description}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <button className="save-button" onClick={handleUpdate}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>

                    </>
                ) : (
                    <>
                        <div className="todo-item-details"
                            onClick={handleClick}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                        </div>
                        <div className="todo-item-controls">
                            {!updatedTodo.completed && <button className="edit-button" onClick={handleEdit}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>}
                            <button className="delete-button" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                    </>
                )
                }
            </div>
        </div >
    );
};

export default TodoItem;
