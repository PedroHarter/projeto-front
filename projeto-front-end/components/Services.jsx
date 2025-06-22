import { useState, useEffect } from 'react';
import api from '../src/services/api';

// Componente de Gerenciamento de Serviços - Versão simplificada
export default function Services() {
  // Estados para gerenciar os dados
  const [services, setServices] = useState([]); // Lista de serviços
  const [loading, setLoading] = useState(true); // Se está carregando
  const [showForm, setShowForm] = useState(false); // Se deve mostrar o formulário
  const [editingService, setEditingService] = useState(null); // Serviço sendo editado
  const [message, setMessage] = useState(''); // Mensagem de sucesso/erro

  // Estados do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    status: 'ativo',
    profissional: '',
    localizacao: '',
    imagem: ''
  });

  // Carrega os serviços quando o componente é montado
  useEffect(() => {
    loadServices();
  }, []);

  // Função para carregar todos os serviços
  const loadServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      setMessage('Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  };

  // Função para mostrar mensagem temporária
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  // Função para salvar serviço (criar ou editar)
  const saveService = async (e) => {
    e.preventDefault();
    
    try {
      // Prepara os dados do serviço
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price), // Converte para número
        dataCriacao: editingService ? editingService.dataCriacao : new Date().toISOString().split('T')[0]
      };

      if (editingService) {
        // Se está editando, atualiza o serviço existente
        await api.put(`/services/${editingService.id}`, serviceData);
        showMessage('Serviço atualizado com sucesso!');
      } else {
        // Se é novo, cria um novo serviço
        await api.post('/services', serviceData);
        showMessage('Serviço criado com sucesso!');
      }
      
      // Fecha o formulário e recarrega a lista
      setShowForm(false);
      setEditingService(null);
      clearForm();
      loadServices();
    } catch (error) {
      showMessage('Erro ao salvar serviço');
    }
  };

  // Função para editar um serviço
  const editService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(), // Converte para string para o input
      duration: service.duration,
      category: service.category,
      status: service.status,
      profissional: service.profissional,
      localizacao: service.localizacao,
      imagem: service.imagem
    });
    setShowForm(true);
  };

  // Função para excluir um serviço
  const deleteService = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await api.delete(`/services/${id}`);
        showMessage('Serviço excluído com sucesso!');
        loadServices();
      } catch (error) {
        showMessage('Erro ao excluir serviço');
      }
    }
  };

  // Função para limpar o formulário
  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      status: 'ativo',
      profissional: '',
      localizacao: '',
      imagem: ''
    });
  };

  // Função para abrir formulário de novo serviço
  const openNewServiceForm = () => {
    setEditingService(null);
    clearForm();
    setShowForm(true);
  };

  // Função para formatar preço em reais
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Mostra tela de carregamento
  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Carregando serviços...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        {/* Cabeçalho da página */}
        <div className="card-header">
          <h1 className="card-title">🛠️ Gerenciar Serviços</h1>
          <button onClick={openNewServiceForm} className="btn btn-success">
            ➕ Novo Serviço
          </button>
        </div>

        {/* Mensagem de sucesso/erro */}
        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {/* Tabela de serviços */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Duração</th>
                <th>Profissional</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.title}</td>
                  <td>{service.category}</td>
                  <td>{formatPrice(service.price)}</td>
                  <td>{service.duration}</td>
                  <td>{service.profissional}</td>
                  <td>
                    <span className={`badge ${service.status === 'ativo' ? 'badge-success' : 'badge-secondary'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => editService(service)} 
                      className="btn btn-warning btn-sm"
                      style={{ marginRight: '5px' }}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)} 
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal/Formulário */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingService ? '✏️ Editar Serviço' : '➕ Novo Serviço'}
              </h2>
              <button 
                className="close" 
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={saveService}>
              {/* Campo Título */}
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              {/* Campo Descrição */}
              <div className="form-group">
                <label>Descrição *</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  required
                />
              </div>

              {/* Campo Preço */}
              <div className="form-group">
                <label>Preço *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              {/* Campo Duração */}
              <div className="form-group">
                <label>Duração *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="ex: 30min, 1h"
                  required
                />
              </div>

              {/* Campo Categoria */}
              <div className="form-group">
                <label>Categoria *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>

              {/* Campo Status */}
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              {/* Campo Profissional */}
              <div className="form-group">
                <label>Profissional</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.profissional}
                  onChange={(e) => setFormData({...formData, profissional: e.target.value})}
                />
              </div>

              {/* Campo Localização */}
              <div className="form-group">
                <label>Localização</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                />
              </div>

              {/* Campo URL da Imagem */}
              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.imagem}
                  onChange={(e) => setFormData({...formData, imagem: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              {/* Botões do formulário */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  ❌ Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingService ? '💾 Atualizar' : '➕ Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 