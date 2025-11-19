import React, { useState } from 'react';
import './css/RegisterForm.css';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function togglePassword() {
    setShowPassword(prev => !prev);
  }
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
    <div className="signup-container">
      <div
        className="card card-signup shadow-lg p-3"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="text-purple-dark fw-bold">Cadastre-se no ApeAqui!</h2>
            <p className="text-muted">Comece sua gestão inteligente hoje mesmo!</p>
          </div>

          <form id="signupForm" action="ControllerSignin.php" method="POST" onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-purple-dark fw-semibold">
                Nome Completo
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="name"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-purple-dark fw-semibold">
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
              <label htmlFor="password" className="form-label text-purple-dark fw-semibold">
                Crie uma Senha
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength="8"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePassword}
                >
                  <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                </button>
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                required
              />
              <label
                className="form-check-label text-muted"
                htmlFor="termsCheck"
              >
                Eu concordo com os{" "}
                <a href="#" className="text-purple-dark fw-semibold" style={{ textDecoration: "none" }}>
                  Termos de Serviço
                </a>.
              </label>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-custom btn-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <span>Criar Conta</span>
                )}
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">
                <small className="text-muted">
                  Já tem uma conta?{" "}
                  <a href="#" className="text-purple-dark fw-semibold" style={{ textDecoration: "none" }}>
                    Fazer Login
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
