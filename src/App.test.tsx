import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('очистка выполненных задач', () => {
    render(<App />);

    // Добавляем задачи
    fireEvent.change(screen.getByPlaceholderText(/Введите задачу/i), {
        target: { value: 'Первая задача' },
    });
    fireEvent.click(screen.getByText(/Добавить/i));

    fireEvent.change(screen.getByPlaceholderText(/Введите задачу/i), {
        target: { value: 'Вторая задача' },
    });
    fireEvent.click(screen.getByText(/Добавить/i));

    // Отмечаем первую как выполненную
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    // Нажимаем «Очистить выполненные»
    fireEvent.click(screen.getByText(/Очистить выполненные/i));

    expect(screen.queryByText('Первая задача')).not.toBeInTheDocument();
    expect(screen.getByText('Вторая задача')).toBeInTheDocument();
});