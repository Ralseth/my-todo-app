import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

test('отображение задач', () => {
    const todos = [
        { id: 1, text: 'Первая задача', completed: false },
        { id: 2, text: 'Вторая задача', completed: true },
    ];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />);

    const todoText1 = screen.getByText(/Первая задача/i);
    const todoText2 = screen.getByText(/Вторая задача/i);

    expect(todoText1).toBeInTheDocument();
    expect(todoText2).toBeInTheDocument();
});