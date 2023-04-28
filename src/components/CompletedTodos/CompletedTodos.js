import React from 'react';
import './CompletedTodos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CompletedTodos = ({ todos, onDelete }) => {
    const completedTodos = todos.filter((todo) => todo.completed);

    const handleDelete = async (id) => {
        onDelete(id);
    };

    return (
        <div className="completed-todos">
            <h2>Completed Tasks</h2>
            <ul className="custom-scrollbar">
                {completedTodos.map((todo) => (
                    <li key={todo._id}>
                        {todo.title}
                        <button className="delete-completed" onClick={() => handleDelete(todo._id)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTodos;
