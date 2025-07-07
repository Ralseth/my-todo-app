import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Todo } from './types';
import './App.css';

const getTaskWord = (count: number): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod100 >= 11 && mod100 <= 14) return 'Задач';
    if (mod10 === 1) return 'Задача';
    if (mod10 >= 2 && mod10 <= 4) return 'Задачи';
    return 'Задач';
};

const getLeftWord = (count: number): string =>
    count === 1 ? 'осталась' : 'осталось';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const addTodo = (text: string) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const remaining = todos.filter(t => !t.completed).length;
    const filteredTodos = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const hasCompleted = todos.some(t => t.completed);

    return (
        <div className="App">
            <h1>Список дел</h1>
            <TodoInput onAdd={addTodo} />

            <div className="controls">
                <span className="remaining">
                  {remaining} {getTaskWord(remaining)} {getLeftWord(remaining)}
                </span>

                <div className="status-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Все
                    </button>
                    <button
                        className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Активные
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Выполненные
                    </button>
                </div>

                {hasCompleted ? (
                    <button className="clear-completed" onClick={clearCompleted}>
                        Очистить выполненные
                    </button>
                ) : (
                    <div style={{ width: '150px' }} /> /* пустышка, чтобы выровнять сетку */
                )}
            </div>

            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
        </div>
    );
};

export default App;