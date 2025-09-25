import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { getOne, updateCompleta } from "../api/todoApi";

function TodoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  // 1. CARREGAMENTO DOS DADOS (useEffect)
  // Formata a data para exibir no campo de input do tipo "date"
  useEffect(() => {
    getOne(id).then(res => {
      // Formata a data para YYYY-MM-DD para o campo de input
      const formattedData = {
        ...res.data,
        dataLimite: new Date(res.data.dataLimite).toISOString().split('T')[0]
      };
      setTodo(formattedData);
    });
  }, [id]);

  // 2. SALVAMENTO DOS DADOS (handleUpdate)
  // Formata a data para enviar ao backend
  const handleUpdate = async (updatedFields) => {
    try {
      // Converte a string YYYY-MM-DD de volta para o formato ISO completo
      const dataToSend = {
        ...updatedFields,
         dataLimite: updatedFields.dataLimite
      };
      
      await updateCompleta(id, dataToSend); // Envia os dados formatados
      navigate("/");
    } catch (error) {
      console.log("Erro completo da requisição:", error);
      alert("Erro ao salvar a edição. Por favor, tente novamente.");
    }
  };

  if (!todo) return <p>Carregando...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>
      <TodoForm initialData={todo} onSubmit={handleUpdate} />
    </div>
  );
}

export default TodoEdit;