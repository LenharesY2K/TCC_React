import React, { useState } from 'react';
import { User, Phone, Mail, CreditCard, Home, Check, X, UserPlus } from 'lucide-react';
import './css/css.css';

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    email: '',
    associarApartamento: false,
    tipoAssociacao: 'morador',
    numeroApartamento: '',
    bloco: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.associarApartamento) {
      if (!formData.numeroApartamento.trim()) {
        newErrors.numeroApartamento = 'Número do apartamento é obrigatório';
      }
      if (!formData.bloco.trim()) {
        newErrors.bloco = 'Bloco é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Dados do cliente:', formData);
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          nome: '',
          telefone: '',
          cpf: '',
          email: '',
          associarApartamento: false,
          tipoAssociacao: 'morador',
          numeroApartamento: '',
          bloco: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      telefone: '',
      cpf: '',
      email: '',
      associarApartamento: false,
      tipoAssociacao: 'morador',
      numeroApartamento: '',
      bloco: ''
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
              <UserPlus size={32} />
            </div>
            <div>
              <h1 className="header-title">Cadastrar Novo Cliente</h1>
              <p className="header-subtitle">Preencha os dados abaixo para criar um novo cliente no sistema</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="success-message">
            <Check size={20} />
            <span className="success-text">Cliente cadastrado com sucesso!</span>
          </div>
        )}

        {/* Form Content */}
        <div className="form-content">
          <div className="form-section">
            <h3 className="section-title">Dados Pessoais</h3>

            <div className="form-grid">
              {/* Nome */}
              <div>
                <label className="form-label">
                  Nome Completo
                </label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Exemplo: Nicolas Augusto Nogueira de Moraes"
                    className={`form-input ${errors.nome ? 'error' : ''}`}
                  />
                </div>
                {errors.nome && (
                  <p className="error-message">{errors.nome}</p>
                )}
              </div>

              {/* Telefone e CPF */}
              <div className="form-grid-2">
                <div>
                  <label className="form-label">
                    Telefone
                  </label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleTelefoneChange}
                      placeholder="(14) 99999-9999"
                      maxLength={14}
                      className={`form-input ${errors.telefone ? 'error' : ''}`}
                    />
                  </div>
                  {errors.telefone && (
                    <p className="error-message">{errors.telefone}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">
                    CPF
                  </label>
                  <div className="input-wrapper">
                    <CreditCard className="input-icon" size={18} />
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      maxLength={11}
                      placeholder="000.000.000-00"
                      className={`form-input ${errors.cpf ? 'error' : ''}`}
                    />
                  </div>
                  {errors.cpf && (
                    <p className="error-message">{errors.cpf}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email" required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="emailexemplo@email.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="section-divider">
            <div
              className="checkbox-container"
              onClick={() => handleChange({ target: { name: 'associarApartamento', type: 'checkbox', checked: !formData.associarApartamento } })}
            >
              <input
                type="checkbox"
                name="associarApartamento"
                checked={formData.associarApartamento}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label className="checkbox-label">
                <Home size={20} />
                Associar a um Apartamento
              </label>
            </div>

            {formData.associarApartamento && (
              <div className="apartment-section">
                <div className="form-section">
                  <label className="form-label">
                    Tipo de Associação
                  </label>
                  <div className="radio-group">
                    <label className={`radio-label ${formData.tipoAssociacao === 'morador' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="tipoAssociacao"
                        value="morador"
                        checked={formData.tipoAssociacao === 'morador'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className={`radio-text ${formData.tipoAssociacao === 'morador' ? 'active' : ''}`}>
                        Morador
                      </span>
                    </label>
                    <label className={`radio-label ${formData.tipoAssociacao === 'proprietario' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="tipoAssociacao"
                        value="proprietario"
                        checked={formData.tipoAssociacao === 'proprietario'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className={`radio-text ${formData.tipoAssociacao === 'proprietario' ? 'active' : ''}`}>
                        Proprietário
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">
                      Bloco
                    </label>
                    <input
                      type="text"
                      name="bloco"
                      value={formData.bloco}
                      onChange={handleChange}
                      maxLength={2}
                      placeholder="A1"
                      className={`apartment-input ${errors.bloco ? 'error' : ''}`}
                    />
                    {errors.bloco && (
                      <p className="error-message">{errors.bloco}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      Número do Apartamento
                    </label>
                    <input
                      type="text"
                      name="numeroApartamento"
                      value={formData.numeroApartamento}
                      onChange={handleChange}
                      placeholder="101"
                      maxLength={3}
                      className={`apartment-input ${errors.numeroApartamento ? 'error' : ''}`}
                    />
                    {errors.numeroApartamento && (
                      <p className="error-message">{errors.numeroApartamento}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button onClick={handleSubmit} className="button-primary">
              <Check size={20} />
              Cadastrar Cliente
            </button>
            <button onClick={handleCancel} className="button-secondary">
              <X size={20} />
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <br></br><br></br>
    </div>
  );
}