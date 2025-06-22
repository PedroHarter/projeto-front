import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../src/services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      showAlert('Erro ao carregar usuários', 'danger');
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
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        showAlert('Usuário atualizado com sucesso!', 'success');
      } else {
        await api.post('/users', formData);
        showAlert('Usuário criado com sucesso!', 'success');
      }
      
      setShowModal(false);
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      showAlert('Erro ao salvar usuário', 'danger');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      telefone: user.telefone,
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      cep: user.cep
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        showAlert('Usuário excluído com sucesso!', 'success');
        fetchUsers();
      } catch (error) {
        showAlert('Erro ao excluir usuário', 'danger');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
  };

  const openNewUserModal = () => {
    setEditingUser(null);
    resetForm();
    setShowModal(true);
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
          <h1 className="card-title">Gerenciar Usuários</h1>
          <button onClick={openNewUserModal} className="btn btn-success">
            + Novo Usuário
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
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Função</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.telefone}</td>
                  <td>{user.cidade}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="btn btn-warning btn-sm"
                      style={{ marginRight: '5px' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
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
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
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
                <label>Nome *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>E-mail *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Senha *</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Função</label>
                <select
                  className="form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.cep}
                  onChange={(e) => setFormData({...formData, cep: e.target.value})}
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
                  {editingUser ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 