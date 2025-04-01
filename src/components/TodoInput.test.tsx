import { render, screen, fireEvent } from '@testing-library/react';
import TodoInput from './TodoInput';

test('добавление новой задачи', () => {
    const mockOnAdd = jest.fn();

    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(/Введите задачу/i);
    fireEvent.change(input, { target: { value: 'Новая задача' } });

    const button = screen.getByText(/Добавить/i);
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith('Новая задача');
});