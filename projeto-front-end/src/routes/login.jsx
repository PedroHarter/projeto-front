import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Componente de Login - Versão simplificada
export default function Login() {
  // Estados para armazenar os dados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Função que é executada quando o usuário clica em "Entrar"
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    
    setLoading(true); // Mostra que está carregando
    setError(''); // Limpa erros anteriores
    
    try {
      // Faz uma requisição para buscar usuários com o email e senha informados
      const response = await api.get('/users', { 
        params: { email, password } 
      });
      
      // Se encontrou algum usuário com essas credenciais
      if (response.data.length > 0) {
        // Salva os dados do usuário no localStorage (memória do navegador)
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        
        // Redireciona para o dashboard
        navigate('/dashboard');
      } else {
        // Se não encontrou, mostra erro
        setError('E-mail ou senha inválidos');
      }
    } catch (err) {
      // Se deu erro na conexão com o servidor
      setError('Não foi possível conectar ao servidor');
      console.error(err);
    } finally {
      setLoading(false); // Para de mostrar que está carregando
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sistema de Gestão</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Faça login para acessar o sistema
        </p>
        
        {/* Mostra mensagem de erro se houver */}
        {error && <p className="error">{error}</p>}
        
        {/* Campo de e-mail */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        {/* Botão de login */}
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        {/* Credenciais de teste para facilitar */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p><strong>Teste:</strong></p>
          <p>Admin: admin@exemplo.com / admin123</p>
        </div>
      </form>
    </div>
  );
}
