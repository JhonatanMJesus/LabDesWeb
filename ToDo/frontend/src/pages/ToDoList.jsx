import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToDos, removeToDo } from "../api/ToDoApi";
import ToDoItem from "../components/ToDoItem";
import Style from "./ToDoList.module.css";

export default function ToDoList(){
    const [toDos, setToDos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async () => {
        try {
            setLoading(true);
            const res = await getToDos();
            setToDos(res.data);
        } catch (error) {
            setError(error.Message || "Erro")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {fetch()}, []);

    const handleDelete = async(id) => {
        try {
            setLoading(true);
            await removeToDo(id)
        } catch (error) {
            setError(error.Message || "Erro");
        } finally {
            setLoading(false);
            fetch();
        }
    }

    return (
        <div>
            <div className={Style.header}>
                <h2 className={Style.title}>Tarefas</h2>
                <Link to="/new" className={Style.link}>Nova Tarefa</Link>
            </div>
            {loading && <p>Carregando...</p>}
            {error && <p className={Style.error}>{error}</p>}
            <div className={Style.container}>
                {toDos?.length === 0 && !loading?(
                    <p className={Style.noTasks}>Nenhuma tarefa encontrada.</p>
                ) : (
                    toDos?.map(
                        toDo => (
                            <ToDoItem key={toDo._id} toDo={toDo} onDelete={() => handleDelete(toDo._id)} />
                        )
                    )
                )}
            </div>
        </div>
    );
}