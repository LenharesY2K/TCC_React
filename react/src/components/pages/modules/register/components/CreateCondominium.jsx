import React, { useState } from 'react';
import { Building, MapPin, Layers, Home, Check, X, Plus, Trash2 } from 'lucide-react';
import './css/css.css';
import './css/buttons.css'

export default function CreateCondominium() {
  const [formData, setFormData] = useState({
    nomeCondominio: '',
    rua: '',
    blocos: [
      {
        id: 1,
        numeroBloco: '',
        totalAndares: '',
        apartamentosPorAndar: '',
        apartamentos: []
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlocoChange = (blocoId, field, value) => {
    setFormData(prev => ({
      ...prev,
      blocos: prev.blocos.map(bloco =>
        bloco.id === blocoId
          ? { ...bloco, [field]: value }
          : bloco
      )
    }));

    if (errors[`bloco_${blocoId}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`bloco_${blocoId}_${field}`];
        return newErrors;
      });
    }
  };

  const addBloco = () => {
    const newId = Math.max(...formData.blocos.map(b => b.id)) + 1;
    setFormData(prev => ({
      ...prev,
      blocos: [...prev.blocos, {
        id: newId,
        numeroBloco: '',
        totalAndares: '',
        apartamentosPorAndar: '',
        apartamentos: []
      }]
    }));
  };

  const removeBloco = (blocoId) => {
    if (formData.blocos.length > 1) {
      setFormData(prev => ({
        ...prev,
        blocos: prev.blocos.filter(bloco => bloco.id !== blocoId)
      }));
    }
  };

  const gerarApartamentos = (blocoId) => {
    const bloco = formData.blocos.find(b => b.id === blocoId);
    if (!bloco.totalAndares || !bloco.apartamentosPorAndar) return;

    const apartamentos = [];
    for (let andar = 1; andar <= parseInt(bloco.totalAndares); andar++) {
      for (let apt = 1; apt <= parseInt(bloco.apartamentosPorAndar); apt++) {
        apartamentos.push({
          andar: andar,
          numero: `${andar}0${apt}`,
          bloco: bloco.numeroBloco
        });
      }
    }

    setFormData(prev => ({
      ...prev,
      blocos: prev.blocos.map(b =>
        b.id === blocoId
          ? { ...b, apartamentos }
          : b
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeCondominio.trim()) {
      newErrors.nomeCondominio = 'Nome do condomínio é obrigatório';
    }

    if (!formData.rua.trim()) {
      newErrors.rua = 'Rua é obrigatória';
    }

    formData.blocos.forEach((bloco, index) => {
      if (!bloco.numeroBloco.trim()) {
        newErrors[`bloco_${bloco.id}_numeroBloco`] = 'Número do bloco é obrigatório';
      }
      if (!bloco.totalAndares) {
        newErrors[`bloco_${bloco.id}_totalAndares`] = 'Total de andares é obrigatório';
      }
      if (!bloco.apartamentosPorAndar) {
        newErrors[`bloco_${bloco.id}_apartamentosPorAndar`] = 'Apartamentos por andar é obrigatório';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Gerar apartamentos para todos os blocos antes de enviar
      formData.blocos.forEach(bloco => {
        if (bloco.apartamentos.length === 0) {
          gerarApartamentos(bloco.id);
        }
      });

      console.log('Dados do condomínio:', formData);
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          nomeCondominio: '',
          rua: '',
          blocos: [
            {
              id: 1,
              numeroBloco: '',
              totalAndares: '',
              apartamentosPorAndar: '',
              apartamentos: []
            }
          ]
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      nomeCondominio: '',
      rua: '',
      blocos: [
        {
          id: 1,
          numeroBloco: '',
          totalAndares: '',
          apartamentosPorAndar: '',
          apartamentos: []
        }
      ]
    });
    setErrors({});
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="header-content">
            <div className="header-icon">
              <Building size={32} />
            </div>
            <div>
              <h1 className="header-title">Cadastrar Condomínio</h1>
              <p className="header-subtitle">Preencha os dados do condomínio, blocos e apartamentos</p>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="success-message">
            <Check size={20} />
            <span className="success-text">Condomínio cadastrado com sucesso!</span>
          </div>
        )}

        <div className="form-content">
          <div className="form-section">
            <h3 className="section-title">Dados do Condomínio</h3>

            <div className="form-grid">
              <div>
                <label className="form-label">Nome do Condomínio</label>
                <div className="input-wrapper">
                  <Building className="input-icon" size={18} />
                  <input
                    type="text"
                    name="nomeCondominio"
                    value={formData.nomeCondominio}
                    onChange={handleChange}
                    placeholder="Exemplo: Residencial Bonard"
                    className={`form-input ${errors.nomeCondominio ? 'error' : ''}`}
                  />
                </div>
                {errors.nomeCondominio && (
                  <p className="error-message">{errors.nomeCondominio}</p>
                )}
              </div>

              {/* Rua */}
              <div>
                <label className="form-label">Rua</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={18} />
                  <input
                    type="text"
                    name="rua"
                    value={formData.rua}
                    onChange={handleChange}
                    placeholder="Exemplo: Rua Zangas, 123"
                    className={`form-input ${errors.rua ? 'error' : ''}`}
                  />
                </div>
                {errors.rua && (
                  <p className="error-message">{errors.rua}</p>
                )}
              </div>
            </div>
          </div>

          <div className="section-divider">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}>Blocos e Apartamentos</h3>
              <button
                type="button"
                onClick={addBloco}
                className="button-add-bloco"
              >
                <Plus size={18} />
                Adicionar Bloco
              </button>
            </div>

            {formData.blocos.map((bloco, index) => (
              <div key={bloco.id} className="apartment-section" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#202170',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Bloco {index + 1}
                  </h4>
                  {formData.blocos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBloco(bloco.id)}>
                      <Trash2 size={16} />
                      Remover
                    </button>
                  )}
                </div>

                <div className="form-grid">
                  <div>
                    <label className="form-label">Número/Nome do Bloco</label>
                    <input
                      type="text"
                      value={bloco.numeroBloco}
                      onChange={(e) => handleBlocoChange(bloco.id, 'numeroBloco', e.target.value)}
                      maxLength={2}
                      placeholder="Exemplo: A1, B2, C3..."
                      className={`apartment-input ${errors[`bloco_${bloco.id}_numeroBloco`] ? 'error' : ''}`}
                    />
                    {errors[`bloco_${bloco.id}_numeroBloco`] && (
                      <p className="error-message">{errors[`bloco_${bloco.id}_numeroBloco`]}</p>
                    )}
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label className="form-label">Total de Andares</label>
                      <div className="input-wrapper">
                        <Layers className="input-icon" size={18} />
                        <input
                          type="number"
                          value={bloco.totalAndares}
                          onChange={(e) => handleBlocoChange(bloco.id, 'totalAndares', e.target.value)}
                          maxLength={2}
                          placeholder="Ex: 99"
                          min="1"
                          className={`form-input ${errors[`bloco_${bloco.id}_totalAndares`] ? 'error' : ''}`}
                        />
                      </div>
                      {errors[`bloco_${bloco.id}_totalAndares`] && (
                        <p className="error-message">{errors[`bloco_${bloco.id}_totalAndares`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Apartamentos por Andar</label>
                      <div className="input-wrapper">
                        <Home className="input-icon" size={18} />
                        <input
                          type="number"
                          value={bloco.apartamentosPorAndar}
                          onChange={(e) => handleBlocoChange(bloco.id, 'apartamentosPorAndar', e.target.value)}
                          placeholder="Ex: 99"
                          min="1"
                          maxLength={2}
                          className={`form-input ${errors[`bloco_${bloco.id}_apartamentosPorAndar`] ? 'error' : ''}`}
                        />
                      </div>
                      {errors[`bloco_${bloco.id}_apartamentosPorAndar`] && (
                        <p className="error-message">{errors[`bloco_${bloco.id}_apartamentosPorAndar`]}</p>
                      )}
                    </div>
                  </div>

                  {bloco.totalAndares && bloco.apartamentosPorAndar && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => gerarApartamentos(bloco.id)}
                        style={{
                          background: 'linear-gradient(135deg, #202170 0%, #161750 100%)',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Gerar Previa dos Apartamentos
                      </button>
                    </div>
                  )}

                  {bloco.apartamentos.length > 0 && (
                    <div style={{
                      marginTop: '15px',
                      padding: '15px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '10px'
                      }}>
                        Previa: {bloco.apartamentos.length} apartamentos serão criados
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '8px',
                        maxHeight: '150px',
                        overflowY: 'auto'
                      }}>
                        {bloco.apartamentos.map((apt, idx) => (
                          <div key={idx} style={{
                            padding: '8px',
                            background: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            fontSize: '12px',
                            textAlign: 'center',
                            color: '#6b7280'
                          }}>
                            Apt {apt.numero}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button onClick={handleSubmit} className="button-primary">
              <Check size={20} />
              Cadastrar Condomínio
            </button>
            <button onClick={handleCancel} className="button-secondary">
              <X size={20} />
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  );
}