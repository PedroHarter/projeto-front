import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          Sistema de Gestão
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className={location.pathname === '/services' ? 'active' : ''}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link 
              to="/users" 
              className={location.pathname === '/users' ? 'active' : ''}
            >
              Usuários
            </Link>
          </li>
          <li>
            <span style={{ color: '#bdc3c7', padding: '8px 16px' }}>
              Olá, {user.name}
            </span>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(231, 76, 60, 0.8)'}
              onMouseOut={(e) => e.target.style.background = 'none'}
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
} 