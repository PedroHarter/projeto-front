import { useState, useEffect } from 'react';
import api from '../src/services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

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

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      showAlert('Erro ao carregar serviços', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        dataCriacao: editingService ? editingService.dataCriacao : new Date().toISOString().split('T')[0]
      };

      if (editingService) {
        await api.put(`/services/${editingService.id}`, serviceData);
        showAlert('Serviço atualizado com sucesso!', 'success');
      } else {
        await api.post('/services', serviceData);
        showAlert('Serviço criado com sucesso!', 'success');
      }
      
      setShowModal(false);
      setEditingService(null);
      resetForm();
      fetchServices();
    } catch (error) {
      showAlert('Erro ao salvar serviço', 'danger');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
      status: service.status,
      profissional: service.profissional,
      localizacao: service.localizacao,
      imagem: service.imagem
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await api.delete(`/services/${id}`);
        showAlert('Serviço excluído com sucesso!', 'success');
        fetchServices();
      } catch (error) {
        showAlert('Erro ao excluir serviço', 'danger');
      }
    }
  };

  const resetForm = () => {
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

  const openNewServiceModal = () => {
    setEditingService(null);
    resetForm();
    setShowModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

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
          <h1 className="card-title">Gerenciar Serviços</h1>
          <button onClick={openNewServiceModal} className="btn btn-success">
            + Novo Serviço
          </button>
        </div>

        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

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
                      onClick={() => handleEdit(service)} 
                      className="btn btn-warning btn-sm"
                      style={{ marginRight: '5px' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)} 
                      className="btn btn-danger btn-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
              </h2>
              <button 
                className="close" 
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
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

              <div className="form-group">
                <label>Profissional</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.profissional}
                  onChange={(e) => setFormData({...formData, profissional: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Localização</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                />
              </div>

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

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingService ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 