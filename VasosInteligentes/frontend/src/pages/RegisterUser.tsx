import React, { useState } from 'react';
import styles from './RegisterUser.module.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterUser: React.FC = () => {
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState<'Admin' | 'User'>('User');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!user || user.perfil !== 'Admin') {
    return <div className={styles.container}><p>Você não tem permissão para acessar esta página.</p></div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerUser({ nome, email, senha, perfil });
    setLoading(false);
    if (res.ok) {
      setMessage('Usuário cadastrado com sucesso.');
      // opcional: navigate('/'); ou limpar formulário
      setNome(''); setEmail(''); setSenha(''); setPerfil('User');
    } else {
      setMessage(res.message || 'Erro ao cadastrar.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastrar Usuário</h2>
        {message && <div className={styles.message}>{message}</div>}

        <label className={styles.label}>Nome</label>
        <input className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label className={styles.label}>Email</label>
        <input type="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className={styles.label}>Senha</label>
        <input type="password" className={styles.input} value={senha} onChange={(e) => setSenha(e.target.value)} minLength={6} required />

        <label className={styles.label}>Perfil</label>
        <select className={styles.input} value={perfil} onChange={(e) => setPerfil(e.target.value as 'Admin'|'User')}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg" type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
