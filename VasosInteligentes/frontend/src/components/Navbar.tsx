import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.brand}>Vasos Inteligentes</Link>
      </div>

      <div className={styles.right}>
        {!user && <Link to="/login" className={styles.link}>Login</Link>}

        {user && (
          <>
           
            <Link to="/vasos/novo" className={styles.link}>
              Cadastrar Vaso
            </Link>

          
            {user.perfil === 'Admin' && (
              <Link to="/admin/register-user" className={styles.link}>
                Cadastrar Usuário
              </Link>
            )}

            <button className={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
