import React, { useState } from 'react';
import './css/RegisterForm.css';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
  });

  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setErrors({});

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registro realizado com sucesso! Verifique seu e-mail para confirmação.');
        setForm({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          terms: false
        });
      } else {
        setErrors(data.errors || {});
        setMessage(data.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro de rede. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="card card-signup shadow-lg p-3" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="text-purple-dark fw-bold">Cadastre-se no ApeAqui!</h2>
            <p className="text-muted">Comece sua gestão inteligente hoje mesmo!</p>
          </div>

          {message && <p style={{ color: message.includes('sucesso') ? 'green' : 'red' }}>{message}</p>}

          <form id="signupForm" onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-purple-dark fw-semibold">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="name"
                placeholder="Seu nome completo"
                value={form.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-purple-dark fw-semibold">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="nome@empresa.com.br"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-purple-dark fw-semibold">Crie uma Senha</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
                <button type="button" className="btn btn-outline-secondary" onClick={togglePassword}>
                  <i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                </button>
              </div>
              {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label text-purple-dark fw-semibold">Confirme a Senha</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Confirme a senha"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
              {errors.password_confirmation && <p style={{ color: 'red' }}>{errors.password_confirmation[0]}</p>}
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                required
              />
              <label className="form-check-label text-muted" htmlFor="termsCheck">
                Eu concordo com os{" "}
                <a href="#" className="text-purple-dark fw-semibold" style={{ textDecoration: "none" }}>Termos de Serviço</a>.
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-custom btn-lg" disabled={isLoading}>
                {isLoading ? <span className="spinner"></span> : <span>Criar Conta</span>}
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">
                <small className="text-muted">
                  Já tem uma conta?{" "}
                  <a href="#" className="text-purple-dark fw-semibold" style={{ textDecoration: "none" }}>Fazer Login</a>
                </small>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
