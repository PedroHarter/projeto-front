import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../src/services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.get('/users', { 
        params: { email, password } 
      });
      
      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        navigate('/dashboard');
      } else {
        setError('E-mail ou senha inválidos');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sistema de Gestão</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Faça login para acessar o sistema
        </p>
        
        {error && <p className="error">{error}</p>}
        
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p><strong>Credenciais de teste:</strong></p>
          <p>Admin: admin@exemplo.com / admin123</p>
          <p>Usuário: joao@exemplo.com / 123456</p>
        </div>
      </form>
    </div>
  );
}
