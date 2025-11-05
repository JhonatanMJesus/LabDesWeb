import React from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vinda(o) {user ? user.nome : 'usuário'}</h1>
        <p className={styles.subtitle}>Painel inicial — aqui você adiciona seus componentes de vasos inteligentes.</p>
      </div>
    </div>
  );
};

export default Dashboard;
