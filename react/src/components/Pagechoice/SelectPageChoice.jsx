import React from "react";
import './css/PageChoice.css';

export default function SelectPageChoice({ user }) {
    return (
        <div className="onboarding-container">
            <div className="container" style={{ maxWidth: 800 }}>
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold text-purple-dark">
                        Olá, <span id="user-name">{user?.name || "Usuário"}</span>!
                    </h1>
                    <p className="lead text-muted mt-3">
                        Parece que você ainda não faz parte de uma organização. Para começar a usar o apê ERP, escolha uma das opções abaixo:
                    </p>
                </div>


                <div className="row g-4">
                    <div className="col-md-6">
                        <div
                            className="card option-card p-3 h-100 shadow-sm"
                            role="button"
                            onClick={() => (window.location.href = '/StartTrial')}
                        >
                            <div className="card-body">
                                <i className="bi bi-building option-icon" aria-hidden="true"></i>
                                <div>
                                    <h3 className="fs-5 fw-bold text-purple-dark">Criar uma Nova Organização</h3>
                                    <p className="text-muted m-0">
                                        Comece do zero! Crie e configure o ambiente da sua empresa para ter total controle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div
                            className="card option-card p-3 h-100 shadow-sm"
                            role="button"
                            onClick={() => (window.location.href = '/join')}
                        >
                            <div className="card-body">
                                <i className="bi bi-person-fill-add option-icon" aria-hidden="true"></i>
                                <div>
                                    <h3 className="fs-5 fw-bold text-purple-dark">Fazer Parte de uma Existente</h3>
                                    <p className="text-muted m-0">
                                        Junte-se à equipe! Use um código de convite ou link para acessar sua organização.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="text-center mt-5">
                    <p className="text-muted">
                        <small>
                            Se você recebeu um convite por e-mail, clique no link diretamente para simplificar o processo.
                        </small>
                    </p>
                    <a href="#" className="btn btn-sm btn-outline-secondary">Ajuda e Suporte</a>
                </div>
            </div>
        </div>
    );
}