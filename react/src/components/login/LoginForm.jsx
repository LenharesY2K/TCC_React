import React, { useState } from 'react';
import './css/LoginForm.css';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      window.location.href = '/dashboard';

    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      alert('Erro ao fazer login');
    }
  };

  return (

    <div className="login-container">
      <div className="card card-login shadow-lg p-3" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="text-purple-dark fw-bold">Acesso ao Apeaqui!</h2>
            <p className="text-muted">Entre com suas credenciais.</p>
          </div>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-purple-dark">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="nome@empresa.com.br"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold text-purple-dark">
                Senha
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Sua senha"
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePassword}
                  aria-label="Mostrar/Esconder Senha"
                >
                  <i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                </button>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-custom btn-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <span>Entrar</span>
                )}
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-1">
                <small className="text-muted">
                  Esqueceu sua senha?{' '}
                  <a href="#" className="text-purple-dark fw-semibold" style={{ textDecoration: 'none' }}>
                    Clique aqui
                  </a>
                </small>
              </p>
              <p className="mb-0">
                <small className="text-muted">
                  Não tem conta?{' '}
                  <a
                    href="/signin"
                    className="text-purple-dark fw-semibold"
                    style={{ textDecoration: 'none' }}
                  >
                    Criar uma
                  </a>
                </small>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
