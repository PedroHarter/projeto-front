import React from 'react';

export default function AddService({ formData, onChange, onSubmit, onCancel }) {
  return (
    <div className="service-form" style={{ marginBottom: '30px', border: '1px solid #eee', borderRadius: '8px', padding: '20px', background: '#fafbfc' }}>
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="modal-title">➕ Novo Serviço</h2>
        <button 
          className="close" 
          onClick={onCancel}
          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          &times;
        </button>
      </div>
      <form onSubmit={onSubmit}>
        {/* Campo Título */}
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={e => onChange({ ...formData, title: e.target.value })}
            required
          />
        </div>
        {/* Campo Descrição */}
        <div className="form-group">
          <label>Descrição *</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={e => onChange({ ...formData, description: e.target.value })}
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
            onChange={e => onChange({ ...formData, price: e.target.value })}
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
            onChange={e => onChange({ ...formData, duration: e.target.value })}
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
            onChange={e => onChange({ ...formData, category: e.target.value })}
            required
          />
        </div>
        {/* Campo Status */}
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={formData.status}
            onChange={e => onChange({ ...formData, status: e.target.value })}
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
            onChange={e => onChange({ ...formData, profissional: e.target.value })}
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
            ➕ Criar
          </button>
        </div>
      </form>
    </div>
  );
}
