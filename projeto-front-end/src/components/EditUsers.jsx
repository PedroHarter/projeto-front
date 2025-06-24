import React from 'react';

export default function EditUsers({ formData, onChange, onSubmit, onCancel }) {
  return (
    <div className="user-form" style={{ marginBottom: '30px', border: '1px solid #eee', borderRadius: '8px', padding: '20px', background: '#fafbfc' }}>
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="modal-title">✏️ Editar Usuário</h2>
        <button 
          className="close" 
          onClick={onCancel}
          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          &times;
        </button>
      </div>
      <form onSubmit={onSubmit}>
        {/* Campo Nome */}
        <div className="form-group">
          <label>Nome *</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={e => onChange({ ...formData, name: e.target.value })}
            required
          />
        </div>
        {/* Campo E-mail */}
        <div className="form-group">
          <label>E-mail *</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={e => onChange({ ...formData, email: e.target.value })}
            required
          />
        </div>
        {/* Campo Senha */}
        <div className="form-group">
          <label>Senha *</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={e => onChange({ ...formData, password: e.target.value })}
            required
          />
        </div>
        {/* Campo Função */}
        <div className="form-group">
          <label>Função</label>
          <select
            className="form-control"
            value={formData.role}
            onChange={e => onChange({ ...formData, role: e.target.value })}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {/* Campo Telefone */}
        <div className="form-group">
          <label>Telefone</label>
          <input
            type="text"
            className="form-control"
            value={formData.telefone}
            onChange={e => onChange({ ...formData, telefone: e.target.value })}
          />
        </div>
        {/* Campo Cidade */}
        <div className="form-group">
          <label>Cidade</label>
          <input
            type="text"
            className="form-control"
            value={formData.cidade}
            onChange={e => onChange({ ...formData, cidade: e.target.value })}
          />
        </div>
        {/* Botões do formulário */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            ❌ Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            💾 Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}
