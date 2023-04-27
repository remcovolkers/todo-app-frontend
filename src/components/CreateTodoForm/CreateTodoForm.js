import { useState, useRef } from 'react';
import './CreateTodoForm.css';

function CreateTodoForm({ onCreateTodo }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const titleInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTodo({
            title,
            description,
            completed: false,
        });
        setTitle('');
        setDescription('');
        titleInputRef.current.focus();
    };



    return (
        <form className="create-todo-form" onSubmit={handleSubmit}>
            <h2>Create Todo Item</h2>
            <label htmlFor="title">Title:</label>
            <div className="form-group">
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    ref={titleInputRef}
                />
            </div>
            <label htmlFor="description">Description:</label>
            <div className="form-group">
                <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateTodoForm;
