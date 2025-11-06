import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, senha);
    if (!result.ok) {
      setErro(result.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Entrar</h2>

        {erro && <p className={styles.error}>{erro}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />

        
          <button 
  type="submit" 
  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
>
  Entrar
</button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
