import { useState, useEffect } from 'react';
import api from '../services/api';
import AddUsers from '../components/AddUsers';
import EditUsers from '../components/EditUsers';

// Componente de Gerenciamento de Usuários - Versão simplificada
export default function Users() {
  // Estados para gerenciar os dados
  const [users, setUsers] = useState([]); // Lista de usuários
  const [loading, setLoading] = useState(true); // Se está carregando
  const [showForm, setShowForm] = useState(false); // Se deve mostrar o formulário
  const [editingUser, setEditingUser] = useState(null); // Usuário sendo editado
  const [message, setMessage] = useState(''); // Mensagem de sucesso/erro

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    telefone: '',
    cidade: ''
  });

  // Carrega os usuários quando o componente é montado
  useEffect(() => {
    loadUsers();
  }, []);

  // Função para carregar todos os usuários
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

  // Função para mostrar mensagem temporária
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  // Função para salvar usuário (criar ou editar)
  const saveUser = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // Se está editando, atualiza o usuário existente
        await api.put(`/users/${editingUser.id}`, formData);
        showMessage('Usuário atualizado com sucesso!');
      } else {
        // Se é novo, cria um novo usuário
        const { id, ...userData } = formData;
        await api.post('/users', userData);
        showMessage('Usuário criado com sucesso!');
      }
      
      // Fecha o formulário e recarrega a lista
      setShowForm(false);
      setEditingUser(null);
      clearForm();
      loadUsers();
    } catch (error) {
      showMessage('Erro ao salvar usuário');
    }
  };

  // Função para editar um usuário
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

  // Função para excluir um usuário
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

  // Função para limpar o formulário
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

  // Função para abrir formulário de novo usuário
  const openNewUserForm = () => {
    setEditingUser(null);
    clearForm();
    setShowForm(true);
  };

  // Mostra tela de carregamento
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
        {/* Cabeçalho da página */}
        <div className="card-header">
          <h1 className="card-title">👥 Gerenciar Usuários</h1>
          <button onClick={openNewUserForm} className="btn btn-success">
            ➕ Novo Usuário
          </button>
        </div>

        {/* Mensagem de sucesso/erro */}
        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {/* Formulário de Usuário */}
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

        {/* Tabela de usuários */}
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