import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../src/services/api';

// Componente Dashboard - Versão simplificada
export default function Dashboard() {
  // Estados para armazenar as estatísticas
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [activeServices, setActiveServices] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect é executado quando o componente é montado
  useEffect(() => {
    fetchStats();
  }, []);

  // Função para buscar as estatísticas do sistema
  const fetchStats = async () => {
    try {
      // Faz duas requisições ao mesmo tempo
      const [usersResponse, servicesResponse] = await Promise.all([
        api.get('/users'),      // Busca todos os usuários
        api.get('/services')    // Busca todos os serviços
      ]);

      // Conta quantos serviços estão ativos
      const activeServicesCount = servicesResponse.data.filter(
        service => service.status === 'ativo'
      ).length;

      // Atualiza os estados com os dados
      setTotalUsers(usersResponse.data.length);
      setTotalServices(servicesResponse.data.length);
      setActiveServices(activeServicesCount);
      
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false); // Para de mostrar "carregando"
    }
  };

  // Mostra tela de carregamento
  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Carregando estatísticas...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        {/* Cabeçalho do Dashboard */}
        <div className="card-header">
          <h1 className="card-title">Dashboard - Visão Geral</h1>
        </div>
        
        {/* Cards com estatísticas */}
        <div className="grid">
          {/* Card de Usuários */}
          <div className="card">
            <h3>👥 Usuários</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
              {totalUsers}
            </p>
            <p>Total de usuários cadastrados</p>
            <Link to="/users" className="btn btn-primary">
              Gerenciar Usuários
            </Link>
          </div>

          {/* Card de Serviços */}
          <div className="card">
            <h3>🛠️ Serviços</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
              {totalServices}
            </p>
            <p>Total de serviços cadastrados</p>
            <Link to="/services" className="btn btn-primary">
              Gerenciar Serviços
            </Link>
          </div>

          {/* Card de Serviços Ativos */}
          <div className="card">
            <h3>Serviços Ativos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
              {activeServices}
            </p>
            <p>Serviços disponíveis</p>
            <Link to="/services" className="btn btn-primary">
              Ver Serviços
            </Link>
          </div>
        </div>

        {/* Seção de ações rápidas */}
        <div className="card" style={{ marginTop: '30px' }}>
          <h3>⚡ Ações Rápidas</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/users/new" className="btn btn-success">
              ➕ Novo Usuário
            </Link>
            <Link to="/services/new" className="btn btn-success">
              ➕ Novo Serviço
            </Link>
            <Link to="/users" className="btn btn-primary">
              📋 Listar Usuários
            </Link>
            <Link to="/services" className="btn btn-primary">
              📋 Listar Serviços
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 