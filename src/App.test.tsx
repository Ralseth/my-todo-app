import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('очистка выполненных задач', () => {
    render(<App />);

    // Добавляем задачи
    fireEvent.change(screen.getByPlaceholderText(/Введите задачу/i), { target: { value: 'Первая задача' } });
    fireEvent.click(screen.getByText(/Добавить/i));

    fireEvent.change(screen.getByPlaceholderText(/Введите задачу/i), { target: { value: 'Вторая задача' } });
    fireEvent.click(screen.getByText(/Добавить/i));

    // Отметим одну задачу как выполненную
    const checkbox = screen.getByText('Первая задача').previousElementSibling;
    if (checkbox) {
        fireEvent.click(checkbox);
    } // Чекбокс для первой задачи

    // Нажимаем на кнопку "Clear completed"
    fireEvent.click(screen.getByText(/Clear completed/i));

    // Проверяем, что выполненная задача была удалена
    expect(screen.queryByText('Первая задача')).not.toBeInTheDocument();
    expect(screen.getByText('Вторая задача')).toBeInTheDocument();
});