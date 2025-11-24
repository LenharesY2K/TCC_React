import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faGear,
    faDollarSign,
    faTruck,
    faShieldAlt,
    faClock,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './css/css.css';

export default function CreateOrganization() {
    const [modules, setModules] = useState({
        basic: true,
        financeiro: false,
        logistica: false
    });

    const [formData, setFormData] = useState({
        companyName: '',
        cnpj: '',
        acceptTerms: false
    });

    const cnpjRef = useRef(null);

    const prices = {
        basic: 0.0,
        financeiro: 149.90,
        logistica: 99.90
    };

    const modulesInfo = [
        {
            id: 'basic',
            name: 'BÁSICO',
            icon: faGear,
            description: 'Estrutura fundamental do sistema',
            features: ['Cadastro de usuários', 'Dashboard básico', 'Gestão de perfis'],
            color: '#10b981',
            disabled: true
        },
        {
            id: 'financeiro',
            name: 'Financeiro',
            icon: faDollarSign,
            description: 'Gestão financeira completa',
            features: ['Fluxo de caixa', 'DRE automatizado', 'Contas a pagar/receber'],
            color: '#3b82f6'
        },
        {
            id: 'logistica',
            name: 'Logística',
            icon: faTruck,
            description: 'Controle de encomendas e entregas',
            features: ['Rastreamento', 'Notificações', 'Gestão de estoque'],
            color: '#8b5cf6'
        }
    ];

    useEffect(() => {
        if (cnpjRef.current) {
            const maskCNPJ = (value) => {
                return value
                    .replace(/\D/g, '')
                    .replace(/^(\d{2})(\d)/, '$1.$2')
                    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/\.(\d{3})(\d)/, '.$1/$2')
                    .replace(/(\d{4})(\d)/, '$1-$2')
                    .slice(0, 18);
            };

            cnpjRef.current.addEventListener('input', (e) => {
                e.target.value = maskCNPJ(e.target.value);
            });
        }
    }, []);

    const toggleModule = (mod) => {
        if (mod === 'basic') return;
        setModules((prev) => ({
            ...prev,
            [mod]: !prev[mod],
        }));
    };

    const totalPrice = () => {
        let total = 0;
        Object.keys(modules).forEach((k) => {
            if (modules[k]) total += prices[k];
        });
        return total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData, modules);
    };

    return (
        <>
            <div className="card-login">
                <div className="creation-wrapper">
                    <div className="creation-container-new">
                        <div className="form-container-new">
                            <div className="form-header-new">
                                <h1>Configuração Inicial</h1>
                                <p>Preencha os dados e selecione os módulos para iniciar seu <strong>Trial de 7 dias gratuito</strong></p>
                            </div>

                            <div>
                                <div className="form-section-new">
                                    <div className="section-header-new">
                                        <h2>Dados da Empresa</h2>
                                    </div>

                                    <div className="form-grid-new">
                                        <div className="form-group-new">
                                            <label>Nome da Empresa (Razão Social)</label>
                                            <input
                                                type="text"
                                                className="form-input-new"
                                                placeholder="Ex: Apê Soluções S.A."
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-group-new">
                                            <label>CNPJ</label>
                                            <input
                                                ref={cnpjRef}
                                                type="text"
                                                className="form-input-new"
                                                placeholder="00.000.000/0000-00"
                                                value={formData.cnpj}
                                                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section-new">
                                    <div className="section-header-new">
                                        <h2 className="special">Seleção de Módulos</h2>

                                    </div>

                                    <div className="modules-grid-new">
                                        {modulesInfo.map((module) => (
                                            <div
                                                key={module.id}
                                                className={`module-card-new ${modules[module.id] ? 'selected' : ''} ${module.disabled ? 'disabled' : ''}`}
                                                onClick={() => toggleModule(module.id)}
                                                style={{ borderColor: modules[module.id] ? module.color : '#e5e7eb' }}
                                            >
                                                {modules[module.id] && (
                                                    <div className="check-badge" style={{ background: module.color }}>
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                    </div>
                                                )}

                                                <div className="module-icon-new" style={{ background: `${module.color}20`, color: module.color }}>
                                                    <FontAwesomeIcon icon={module.icon} />
                                                </div>

                                                <h3>{module.name}</h3>
                                                <p className="module-description">{module.description}</p>

                                                <ul className="module-features">
                                                    {module.features.map((feature, idx) => (
                                                        <li key={idx}>
                                                            <FontAwesomeIcon icon={faCheckCircle} />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="module-price">
                                                    <span className="price-value">
                                                        {prices[module.id].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </span>
                                                    <span className="price-period">/ mês</span>
                                                </div>

                                                {module.disabled && (
                                                    <div className="required-badge">Obrigatório</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="total-card-new">
                                        <div className="total-content">
                                            <div>
                                                <span className="total-label">Total Estimado</span>
                                                <span className="total-sublabel">(Após o Trial)</span>
                                            </div>
                                            <div className="total-price">{totalPrice()}<span>/mês</span></div>
                                        </div>
                                        <div className="trial-notice">
                                            <FontAwesomeIcon icon={faClock} />
                                            <span>Você terá 7 dias de Trial gratuito para testar todos os módulos</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Seção 3: Termos */}
                                <div className="form-section-new">
                                    <div className="section-header-new">
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                        <h2>Confirmação e Termos</h2>
                                    </div>

                                    <div className="terms-card-new">
                                        <label className="terms-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={formData.acceptTerms}
                                                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                            />
                                            <span className="checkmark"></span>
                                            <div className="terms-text">
                                                <strong>Declaro que aceito os termos de uso</strong>
                                                <ul>
                                                    <li>
                                                        <FontAwesomeIcon icon={faShieldAlt} />
                                                        Minha conta será criada como Administrador Mestre
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faClock} />
                                                        Após o Trial de 7 dias, os módulos selecionados serão cobrados mensalmente
                                                    </li>
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Botão de Submit */}
                                <button onClick={handleSubmit} className="submit-btn-new">
                                    <span>Finalizar Cadastro</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}