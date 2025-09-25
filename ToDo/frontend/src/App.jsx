import {Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoNew from "./pages/TodoNew";
import TodoEdit from "./pages/TodoEdit";

function App() {
  return (
    
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/new" element={<TodoNew />} />        {/* ROTA "Nova tarefa" */}
          <Route path="/edit/:id" element={<TodoEdit />} />
        </Routes>
      </div>
   
  );
}

export default App;
