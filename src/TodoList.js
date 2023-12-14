import React, { useState } from 'react';

const Todo = ({ id, title, handleDelete, handleUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        handleUpdate(id, newTitle);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            ) : (
                <span>{title}</span>
            )}
            <button onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
            {isEditing && <button onClick={handleSave}>Save</button>}
            <button onClick={() => handleDelete(id)}>Delete</button>
        </li>
    );
};

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            const todo = { id: Date.now(), title: newTodo };
            setTodos([...todos, todo]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleUpdateTodo = (id, newTitle) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div >
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        handleDelete={handleDeleteTodo}
                        handleUpdate={handleUpdateTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;