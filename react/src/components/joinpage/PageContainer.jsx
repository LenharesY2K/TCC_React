import React, { useEffect, useState } from "react";
import "./css/PageContainer.css";

export default function PageContainer() {
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

    useEffect(() => {
        const input = document.getElementById("invitationCode");

        input.addEventListener("input", () => {
            const val = input.value.slice(0, 6);

            for (let i = 0; i < 6; i++) {
                const slot = document.getElementById(`slot-${i}`);
                slot.textContent = val[i] || "";
            }
        });
    }, []);

    return (
        <div className="code-container">
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "450px" }}>
                <div className="card-body text-center">

                    <i
                        className="bi bi-key-fill text-purple-dark mb-3"
                        style={{ fontSize: "3rem" }}
                    ></i>

                    <h2 className="text-purple-dark fw-bold mb-2">Ingressar na Organização</h2>

                    <p className="text-muted mb-4">
                        Insira o código de 6 dígitos fornecido pelo seu RH ou gestor.
                    </p>

                    <form id="joinForm" onSubmit={handleSubmit}>
                        <div className="mb-4">

                            <label
                                htmlFor="invitationCode"
                                className="form-label visually-hidden"
                            >
                                Código de Convite
                            </label>

                            <div className="code-wrapper">
                                <input
                                    type="text"
                                    id="invitationCode"
                                    maxLength={6}
                                    pattern="[0-9A-Za-z]{6}"
                                    required
                                    className="code-input-real"
                                />

                                <div className="code-visual">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="code-slot">
                                            <span className="code-char" id={`slot-${i}`}></span>
                                            <div className="code-underline"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="form-text mt-2 text-start"
                                style={{ maxWidth: "250px", margin: "0 auto" }}
                            >
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
                                    <span>Ingressar</span>
                                )}
                            </button>
                        </div>

                        <div className="text-center mt-3">
                            <small className="text-muted">
                                <a
                                    href="#"
                                    className="text-purple-dark fw-semibold"
                                    style={{ textDecoration: "none" }}
                                >
                                    Voltar às opções
                                </a>
                            </small>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
