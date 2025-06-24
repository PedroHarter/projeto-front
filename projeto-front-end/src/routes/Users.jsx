import { useState, useEffect } from 'react';
import api from '../services/api';
import AddUsers from '../components/AddUsers';
import EditUsers from '../components/EditUsers';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    telefone: '',
    cidade: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      setMessage('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        showMessage('Usuário atualizado com sucesso!');
      } else {
        const { id, ...userData } = formData;
        await api.post('/users', userData);
        showMessage('Usuário criado com sucesso!');
      }
      
      setShowForm(false);
      setEditingUser(null);
      clearForm();
      loadUsers();
    } catch (error) {
      showMessage('Erro ao salvar usuário');
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      telefone: user.telefone,
      cidade: user.cidade

    });
    setShowForm(true);
  };

  const deleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        showMessage('Usuário excluído com sucesso!');
        loadUsers();
      } catch (error) {
        showMessage('Erro ao excluir usuário');
      }
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      telefone: '',
      cidade: ''
    });
  };

  const openNewUserForm = () => {
    setEditingUser(null);
    clearForm();
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Carregando usuários...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">👥 Gerenciar Usuários</h1>
          <button onClick={openNewUserForm} className="btn btn-success">
            ➕ Novo Usuário
          </button>
        </div>

        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {showForm && (
          editingUser ? (
            <EditUsers
              formData={formData}
              onChange={setFormData}
              onSubmit={saveUser}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <AddUsers
              formData={formData}
              onChange={setFormData}
              onSubmit={saveUser}
              onCancel={() => setShowForm(false)}
            />
          )
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
                      onClick={() => editUser(user)} 
                      className="btn btn-warning btn-sm"
                      style={{ marginRight: '5px' }}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => deleteUser(user.id)} 
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