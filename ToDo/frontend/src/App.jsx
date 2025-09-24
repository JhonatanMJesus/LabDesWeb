// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ToDoList from './pages/ToDoList'
import ToDoForm from './pages/ToDoForm';

function App() {

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='max-w-3xl mx-auto mb-6'>
        <nav className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>ToDo</h1>
        </nav>
      </header>
      <main className='max-w-3xl mx-auto bg-white rounded-lg shadow p-6'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ToDoList />} />
            <Route path='/new' element={<ToDoForm />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
