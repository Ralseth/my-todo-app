import React, { useState } from 'react';

interface TodoInputProps {
    onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddClick = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите задачу"
            />
            <button onClick={handleAddClick}>Добавить</button>
        </div>
    );
};

export default TodoInput;