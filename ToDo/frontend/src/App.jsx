// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ToDoList from './pages/ToDoList'
import ToDoForm from './pages/ToDoForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoList />} />
          <Route path='/new' element={<ToDoForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
