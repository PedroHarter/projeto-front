import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../src/services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    activeServices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, servicesRes] = await Promise.all([
          api.get('/users'),
          api.get('/services')
        ]);

        const activeServices = servicesRes.data.filter(service => service.status === 'ativo');

        setStats({
          totalUsers: usersRes.data.length,
          totalServices: servicesRes.data.length,
          activeServices: activeServices.length
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Dashboard</h1>
        </div>
        
        <div className="grid">
          <div className="card">
            <h3>Usuários</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
              {stats.totalUsers}
            </p>
            <p>Total de usuários cadastrados</p>
            <Link to="/users" className="btn btn-primary">
              Gerenciar Usuários
            </Link>
          </div>

          <div className="card">
            <h3>Serviços</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
              {stats.totalServices}
            </p>
            <p>Total de serviços cadastrados</p>
            <Link to="/services" className="btn btn-primary">
              Gerenciar Serviços
            </Link>
          </div>

          <div className="card">
            <h3>Serviços Ativos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
              {stats.activeServices}
            </p>
            <p>Serviços disponíveis</p>
            <Link to="/services" className="btn btn-primary">
              Ver Serviços
            </Link>
          </div>
        </div>

        <div className="card" style={{ marginTop: '30px' }}>
          <h3>Ações Rápidas</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/users/new" className="btn btn-success">
              + Novo Usuário
            </Link>
            <Link to="/services/new" className="btn btn-success">
              + Novo Serviço
            </Link>
            <Link to="/users" className="btn btn-primary">
              Listar Usuários
            </Link>
            <Link to="/services" className="btn btn-primary">
              Listar Serviços
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 