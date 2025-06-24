import { useState, useEffect } from 'react';
import api from '../services/api';
import AddService from '../components/addService';
import EditService from '../components/EditService';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    status: 'ativo',
    profissional: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

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

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveService = async (e) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        dataCriacao: editingService ? editingService.dataCriacao : new Date().toISOString().split('T')[0]
      };

      if (editingService) {
        await api.put(`/services/${editingService.id}`, serviceData);
        showMessage('Serviço atualizado com sucesso!');
      } else {
        await api.post('/services', serviceData);
        showMessage('Serviço criado com sucesso!');
      }
      
      setShowForm(false);
      setEditingService(null);
      clearForm();
      loadServices();
    } catch (error) {
      showMessage('Erro ao salvar serviço');
    }
  };

  const editService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
      status: service.status,
      profissional: service.profissional,
    });
    setShowForm(true);
  };

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

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      status: 'ativo',
      profissional: '',
    });
  };

  const openNewServiceForm = () => {
    setEditingService(null);
    clearForm();
    setShowForm(true);
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
          <h2>Carregando serviços...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">🛠️ Gerenciar Serviços</h1>
          <button onClick={openNewServiceForm} className="btn btn-success">
            ➕ Novo Serviço
          </button>
        </div>

        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {showForm && (
          editingService ? (
            <EditService
              formData={formData}
              onChange={setFormData}
              onSubmit={saveService}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <AddService
              formData={formData}
              onChange={setFormData}
              onSubmit={saveService}
              onCancel={() => setShowForm(false)}
            />
          )
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
    </div>
  );
} 