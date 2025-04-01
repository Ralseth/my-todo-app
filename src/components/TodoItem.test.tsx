import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

test('отметить задачу как выполненную', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    const todo = { id: 1, text: 'Тестовая задача', completed: false };

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1);
});

test('удалить задачу', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    const todo = { id: 1, text: 'Тестовая задача', completed: false };

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

    const deleteButton = screen.getByText(/Удалить/i);
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1);
});