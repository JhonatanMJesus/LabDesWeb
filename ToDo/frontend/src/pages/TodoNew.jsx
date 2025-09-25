// pages/TodoNew.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { createTodo } from '../api/todoApi';

export default function TodoNew() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await createTodo(formData);
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error);
            alert("Erro ao criar a tarefa.");
        }
    };

    return (
        <div>
            <h2>Nova Tarefa</h2>
            <TodoForm onSubmit={handleCreate} />
        </div>
    );
}