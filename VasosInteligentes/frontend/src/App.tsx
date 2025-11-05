// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterUser from './pages/RegisterUser';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { ReactElement } from 'react'; //Import apenas de tipo

// Rota protegida para usuários autenticados
const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// Rota exclusiva para Admin
const AdminRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.perfil !== 'Admin') return <div>Acesso negado</div>;

  return children;
};

// App principal
const App = (): ReactElement => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/register-user"
            element={
              <AdminRoute>
                <RegisterUser />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
