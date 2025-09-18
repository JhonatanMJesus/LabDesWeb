import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToDo } from "../api/ToDoApi";
import Style from "./ToDoForm.module.css";

export default function ToDoForm() {
    const [titulo, setTitulo] = useState(""); 
    const [descricao, setDescricao] = useState(""); 
    const [dataLimite, setDataLimite] = useState(""); 
    const [situacao] = useState("Pendente"); 
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createToDo({titulo, descricao, dataLimite, situacao});
            navigate("/");
        } catch (error) {
            alert("Erro ao criar a tarefa: " + (error.Message || "Erro"));
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={Style.formContainer}>
            <div>
                <label className={Style.formLabel}>Título</label>
                <input required value={titulo} className={Style.formInput} onChange={e=>setTitulo(e.target.value)}></input>
            </div>
            <div>
                <label className={Style.formLabel}>Descrição</label>
                <textarea required value={descricao} className={Style.formInput} onChange={e=>setDescricao(e.target.value)}></textarea>
            </div>
            <div>
                <label className={Style.formLabel}>Data Limite</label>
                <input type="date" required value={dataLimite} className={Style.formInput} onChange={e=>setDataLimite(e.target.value)}></input>
            </div>
            <div className={Style.buttonGroup}>
                <button disabled = {saving} className={Style.buttonPrimary}>{saving ? "Salvando..." : "Salvar"}</button>
                <button type="button" className={Style.buttonSecondary} onClick={() => navigate(-1)}>Cancelar</button>
            </div>
        </form>
    );
}