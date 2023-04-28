import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
    return (
        <div className="todo-list">
            <h2>Todo List</h2>
            <ul className="custom-scrollbar">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onUpdate={onUpdateTodo}
                        onDelete={onDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
