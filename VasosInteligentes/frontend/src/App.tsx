import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterUser from './pages/RegisterUser';
import VasoCreate from './pages/VasoCreate';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import type { ReactElement } from 'react';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.perfil !== 'Admin') return <div>Acesso negado.</div>;
  return children;
};

const GuestRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const App = (): ReactElement => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 🔹 Corrigido: rota agora em português */}
          <Route
            path="/vasos/novo"
            element={
              <ProtectedRoute>
                <Layout>
                  <VasoCreate />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/register-user"
            element={
              <AdminRoute>
                <Layout>
                  <RegisterUser />
                </Layout>
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
