import React from "react";

export default function ToDoItem({toDo, onDelete}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded hover:shadow-sm">
            <div className="font-medium">
                {toDo.titulo}
            </div>
            <div className="text-sm text-gray-600">
                {toDo.descricao}
            </div>
            <div className="font-medium">
                Data Limite: {new Date(toDo.dataLimite).toLocaleDateString()}
            </div>
            <div className="text-sm">
                Situação: {toDo.situacao}
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button onClick={onDelete} className="text-sm px-2 py-1 bg-red-600 text-white rounded">Excluir</button>
            </div>
        </div>
    )
}