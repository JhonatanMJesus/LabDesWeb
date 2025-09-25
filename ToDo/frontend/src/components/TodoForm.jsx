import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./TodoForm.module.css";

// O componente agora recebe duas props:
// 1. initialData: Um objeto com os dados da tarefa (pode ser nulo para nova tarefa)
// 2. onSubmit: Uma função que será chamada quando o formulário for enviado
export default function TodoForm({ initialData, onSubmit }) {
    // Usa um único estado de objeto para todos os campos do formulário
    const [formData, setFormData] = useState(initialData || {
        titulo: "",
        descricao: "",
        dataLimite: "",
        situacao: "Pendente",
    });

    const navigate = useNavigate();

    // Use o useEffect para preencher o formulário quando os dados iniciais chegarem
    useEffect(() => {
        // Se a prop `initialData` existir e for diferente de nulo,
        // use-a para atualizar o estado do formulário.
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]); // Esta linha é crucial para que o efeito seja reativado quando os dados chegarem

    // Lida com a mudança de qualquer campo do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Lida com o envio do formulário, chamando a função `onSubmit`
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // A lógica de salvar é responsabilidade do componente pai
    };

    return (
        <form onSubmit={handleSubmit} className={Style.formContainer}>
            <div>
                <label className={Style.formLabel}>Título</label>
                <input
                    required
                    name="titulo"
                    value={formData.titulo}
                    className={Style.formInput}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className={Style.formLabel}>Descrição</label>
                <textarea
                    required
                    name="descricao"
                    value={formData.descricao}
                    className={Style.formInput}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label className={Style.formLabel}>Data Limite</label>
                <input
                    type="date"
                    required
                    name="dataLimite"
                    value={formData.dataLimite}
                    className={Style.formInput}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="hidden"
                    name="situacao"
                    value={formData.situacao}
                    className={Style.formInput}
                    onChange={handleChange}
                />
            </div>
            <div className={Style.buttonGroup}>
                <button type="submit" className={Style.buttonPrimary}>
                    Salvar
                </button>
                <button
                    type="button"
                    className={Style.buttonSecondary}
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}