import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Todo } from './types';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const addTodo = (text: string) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const remainingTasks = todos.filter((todo) => !todo.completed).length;

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="App">
            <h1>todos</h1>
            <TodoInput onAdd={addTodo} />
            <h3>{remainingTasks} item{remainingTasks !== 1 ? 's' : ''} left</h3>
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

            <div className="status-buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
                <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
            </div>

            {todos.some(todo => todo.completed) && (
                <span className="clear-completed" onClick={clearCompleted}>Clear completed</span>
            )}
        </div>
    );
};

export default App;