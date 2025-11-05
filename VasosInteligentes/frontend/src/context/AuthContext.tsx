import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types/User';
import { login, logout, getProfile, registerUser } from '../api/auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  registerUser: (payload: { nome: string; email: string; senha: string; perfil: string }) => Promise<{ ok: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega o usuário logado via cookie (/auth/me)
  const refreshUser = async () => {
    try {
      const data = await getProfile();
      if (data?.usuario) {
        setUser(data.usuario as User);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const loginUser = async (email: string, senha: string) => {
    try {
      const data = await login(email, senha);
      if (data?.usuario) {
        setUser(data.usuario as User);
        return { ok: true };
      }
      return { ok: false, message: data?.message || 'Erro no login' };
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.response?.data?.error || 'Erro de conexão';
      return { ok: false, message };
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  };

  const registerUserFn = async (payload: {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}) => {
  try {
    // converter para o formato que a API espera
    const body = {
      nome: payload.nome,
      email: payload.email,
      senha: payload.senha,
      perfil: payload.perfil,
    };

    //enviar o corpo já traduzido
    const data = await registerUser(body);

    if (data?.usuario) {
      setUser(data.usuario as User);
    }

    return { ok: true };
  } catch (err: any) {
    const message = err?.response?.data?.message || 'Erro ao cadastrar';
    return { ok: false, message };
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginUser,
        logout: logoutUser,
        registerUser: registerUserFn,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

