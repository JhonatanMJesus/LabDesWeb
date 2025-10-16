import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo, updateParcial } from '../api/todoApi';
import TodoItem from '../components/TodoItem';
// Importa o módulo CSS
import styles from './TodoList.module.css';
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err.message || 'Erro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Excluir esta tarefa?')) return;
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };
  const handleEdit = async (id) => {
    // Redireciona o usuário para a rota de edição, passando o ID da tarefa como um parâmetro
        navigate(`/edit/${id}`);
  };
  const handleEnd = async (id) => {
    try {
        // Esta linha é a chave. Ela envia o objeto { situacao: 'Finalizada' }
        await updateParcial(id, { situacao: 'Finalizada' }); 

        // O resto da sua lógica para atualizar a interface...
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo._id === id ? { ...todo, situacao: 'Finalizada' } : todo
            )
        );
    } catch (error) {
        console.error("Erro ao finalizar a tarefa:", error);
    }
};


  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Tarefas</h2>
        <Link to="/new" className={styles.link}>Nova tarefa</Link>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.container}>
        {todos?.length === 0 && !loading ? (
          <p className={styles.noTasks}>Nenhuma tarefa encontrada.</p>
        ) : (
          todos?.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={() => handleDelete(todo._id)}
              onEdit={() => handleEdit(todo._id)}
              onEnd={() => handleEnd(todo._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}