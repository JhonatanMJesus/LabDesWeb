import React from 'react'

export default function TodoItem({ todo, onDelete, onEdit, onEnd }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded hover:shadow-sm">
      <div>
        <div className="font-medium">{todo.titulo}</div>
        <div className="text-sm text-gray-600">{todo.descricao}</div>
        <div className="text-sm">Data Limite: {new Date(todo.dataLimite).toLocaleDateString()}</div>
        <div className="text-sm">
          Situação: <span className="font-semibold">{todo.situacao}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        {todo.situacao !== "Finalizada" && (
          <>
            <button onClick={onEdit} className="text-sm px-2 py-1 bg-blue-600 text-white rounded">
              Editar
            </button>
            <button onClick={onEnd} className="text-sm px-2 py-1 bg-blue-600 text-white rounded">
              Finalizar
            </button>
          </>
        )}
        <button onClick={onDelete} className="text-sm px-2 py-1 bg-red-600 text-white rounded">
          Excluir
        </button>
      </div>
    </div>
  )
}
