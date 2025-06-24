import { Link, useLocation, useNavigate } from 'react-router-dom';

// Componente de Navegação - Versão simplificada
export default function Navbar() {
  // Hook para saber qual página está ativa
  const location = useLocation();
  
  // Hook para navegação
  const navigate = useNavigate();
  
  // Pega os dados do usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Função para fazer logout
  const handleLogout = () => {
    // Remove os dados do usuário da memória
    localStorage.removeItem('user');
    
    // Volta para a página de login
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo/Nome do sistema */}
        <Link to="/dashboard" className="navbar-brand">
          Sistema de Gestão
        </Link>
        
        {/* Menu de navegação */}
        <ul className="navbar-nav">
          {/* Link para Dashboard */}
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          
          {/* Link para Serviços */}
          <li>
            <Link 
              to="/services" 
              className={location.pathname === '/services' ? 'active' : ''}
            >
              Serviços
            </Link>
          </li>
          
          {/* Link para Usuários */}
          <li>
            <Link 
              to="/users" 
              className={location.pathname === '/users' ? 'active' : ''}
            >
              Usuários
            </Link>
          </li>
          
          {/* Nome do usuário logado */}
          <li>
            <span style={{ color: '#bdc3c7', padding: '8px 16px' }}>
              Olá, {user.name}
            </span>
          </li>
          
          {/* Botão de logout */}
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