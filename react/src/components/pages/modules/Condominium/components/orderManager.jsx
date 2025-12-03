import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Eye, Search, Filter, CheckCircle, Clock, X } from 'lucide-react';
import './css/css.css'; // Mantendo a importação do CSS

/**
 * Componente Encomendas
 *
 * @param {object} props.user Objeto de dados do usuário (opcional, mantido para Navbar)
 * @param {object} props.userModules Objeto contendo as permissões de acesso (visualizar, cadastrar, editar, excluir).
 */
export default function Encomendas({ user, userModules }) {

    // 1. Estados para Permissões (Inicializado com a prop)
    const [modules, setModules] = useState(userModules || {
        visualizar: false,
        cadastrar: false,
        editar: false,
        excluir: false,
    });
    
    // O estado isLoading é mantido para consistência, mas deve ser sempre false aqui.
    const [isLoading, setIsLoading] = useState(false); 

    // Estados existentes (MOCK de dados)
    const [encomendas, setEncomendas] = useState([
        { id: 1, destinatario: 'João Silva', apartamento: '101', remetente: 'Amazon', dataRecebimento: '2024-11-28', entregue: false },
        { id: 2, destinatario: 'Maria Santos', apartamento: '205', remetente: 'Correios', dataRecebimento: '2024-11-27', entregue: true },
        { id: 3, destinatario: 'Pedro Costa', apartamento: '303', remetente: 'Mercado Livre', dataRecebimento: '2024-11-29', entregue: false },
        { id: 4, destinatario: 'Ana Oliveira', apartamento: '102', remetente: 'Shein', dataRecebimento: '2024-11-26', entregue: true },
    ]);

    const [showSuccess, setShowSuccess] = useState(false);
    const [activeContainer, setActiveContainer] = useState('visualizar');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        destinatario: '',
        apartamento: '',
        remetente: '',
        dataRecebimento: '',
        entregue: false
    });

    // 2. useEffect para Sincronizar Permissões
    useEffect(() => {
        // Se a prop mudar (o que não deve acontecer muito), atualiza o estado local
        if (userModules) {
            setModules(userModules);
        }
    }, [userModules]);


    // Funções auxiliares (inalteradas)
    const resetForm = () => {
        setFormData({
            destinatario: '',
            apartamento: '',
            remetente: '',
            dataRecebimento: '',
            entregue: false
        });
        setEditingId(null);
    };

    const handleSuccess = (message) => {
        setShowSuccess(message);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // CRUD Operations (usando 'modules')
    const handleCadastrar = () => {
        if (!modules.cadastrar) return alert("Você não tem permissão para cadastrar encomendas.");

        if (!formData.destinatario || !formData.apartamento || !formData.remetente || !formData.dataRecebimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const novaEncomenda = {
            id: Date.now(),
            ...formData
        };
        setEncomendas([...encomendas, novaEncomenda]);
        handleSuccess('Encomenda cadastrada com sucesso!');
        resetForm();
        setActiveContainer('visualizar');
    };

    const handleEditar = (encomenda) => {
        if (!modules.editar) return alert("Você não tem permissão para editar encomendas.");

        setFormData(encomenda);
        setEditingId(encomenda.id);
        setActiveContainer('editar');
    };

    const handleSalvarEdicao = () => {
        if (!modules.editar) return alert("Você não tem permissão para salvar edições.");

        if (!formData.destinatario || !formData.apartamento || !formData.remetente || !formData.dataRecebimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setEncomendas(encomendas.map(enc =>
            enc.id === editingId ? { ...formData, id: editingId } : enc
        ));
        handleSuccess('Encomenda atualizada com sucesso!');
        resetForm();
        setActiveContainer('visualizar');
    };

    const handleExcluir = (id) => {
        if (!modules.excluir) return alert("Você não tem permissão para excluir encomendas.");

        if (window.confirm('Tem certeza que deseja excluir esta encomenda?')) {
            setEncomendas(encomendas.filter(enc => enc.id !== id));
            handleSuccess('Encomenda excluída com sucesso!');
        }
    };

    const handleMarcarEntregue = (id) => {
        if (!modules.editar) return alert("Você não tem permissão para alterar o status.");

        setEncomendas(encomendas.map(enc =>
            enc.id === id ? { ...enc, entregue: !enc.entregue } : enc
        ));
        handleSuccess('Status atualizado!');
    };

    // Filtros e Stats (inalterados)
    const encomendasFiltradas = encomendas.filter(enc => {
        const matchSearch = enc.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enc.apartamento.includes(searchTerm) ||
            enc.remetente.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'todos' ||
            (filterStatus === 'pendentes' && !enc.entregue) ||
            (filterStatus === 'entregues' && enc.entregue);
        return matchSearch && matchStatus;
    });

    const stats = {
        total: encomendas.length,
        pendentes: encomendas.filter(e => !e.entregue).length,
        entregues: encomendas.filter(e => e.entregue).length
    };

    // Lógica de Renderização
    if (isLoading) {
        return <div className="encomendas-page-container"><div className="encomendas-page-wrapper">Carregando permissões e dados...</div></div>;
    }

    if (activeContainer === 'visualizar' && !modules.visualizar) {
        if (modules.cadastrar) {
            setActiveContainer('cadastrar');
        } else if (modules.editar) {
            setActiveContainer('editar');
        } else {
            return <div className="encomendas-page-container"><div className="encomendas-page-wrapper">Você não tem permissão para acessar a gestão de encomendas.</div></div>;
        }
    }


    return (
        <div className="encomendas-page-container">
            <div className="encomendas-page-wrapper">
                <div className="encomendas-card">
                    <div className="encomendas-card-header">
                        <div className='encomendas-header-content'>
                            <div className="encomendas-header-icon">
                                <Package size={32} />
                            </div>
                            <div>
                                <h1 className="encomendas-header-title">Gestão de Encomendas</h1>
                                <p className="encomendas-header-subtitle">Controle completo de encomendas do condomínio</p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className='encomendas-success-message'>
                            <CheckCircle size={20} />
                            <span className="encomendas-success-text">{showSuccess}</span>
                        </div>
                    )}

                    {/* Navigation - Condicional com base em modules */}
                    <div className="encomendas-navigation">
                        {modules.visualizar && (
                            <button
                                className={`encomendas-nav-button ${activeContainer === 'visualizar' ? 'encomendas-nav-button-active' : ''}`}
                                onClick={() => { setActiveContainer('visualizar'); resetForm(); }}
                            >
                                <Eye size={18} />
                                Visualizar
                            </button>
                        )}
                        {modules.cadastrar && (
                            <button
                                className={`encomendas-nav-button ${activeContainer === 'cadastrar' ? 'encomendas-nav-button-active' : ''}`}
                                onClick={() => { setActiveContainer('cadastrar'); resetForm(); }}
                            >
                                <Plus size={18} />
                                Cadastrar
                            </button>
                        )}
                        {modules.editar && editingId && (
                            <button
                                className={`encomendas-nav-button ${activeContainer === 'editar' ? 'encomendas-nav-button-active' : ''}`}
                                onClick={() => setActiveContainer('editar')}
                            >
                                <Edit size={18} />
                                Editar
                            </button>
                        )}
                    </div>

                    <div className="encomendas-form-content">
                        {/* Container: Visualizar - Condicional com base em modules */}
                        {activeContainer === 'visualizar' && modules.visualizar && (
                            <div>
                                {/* Stats Cards */}
                                <div className="encomendas-stats-grid">
                                    <div className="encomendas-stat-card">
                                        <Package size={24} color="#202170" />
                                        <div>
                                            <div className="encomendas-stat-value">{stats.total}</div>
                                            <div className="encomendas-stat-label">Total</div>
                                        </div>
                                    </div>
                                    <div className="encomendas-stat-card">
                                        <Clock size={24} color="#f59e0b" />
                                        <div>
                                            <div className="encomendas-stat-value">{stats.pendentes}</div>
                                            <div className="encomendas-stat-label">Pendentes</div>
                                        </div>
                                    </div>
                                    <div className="encomendas-stat-card">
                                        <CheckCircle size={24} color="#10b981" />
                                        <div>
                                            <div className="encomendas-stat-value">{stats.entregues}</div>
                                            <div className="encomendas-stat-label">Entregues</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="encomendas-filters-container">
                                    <div className="encomendas-search-container">
                                        <Search size={20} className="encomendas-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Buscar por destinatário, apartamento ou remetente..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="encomendas-search-input"
                                        />
                                    </div>
                                    <div className="encomendas-filter-buttons">
                                        <button
                                            className={`encomendas-filter-button ${filterStatus === 'todos' ? 'encomendas-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('todos')}
                                        >
                                            Todos
                                        </button>
                                        <button
                                            className={`encomendas-filter-button ${filterStatus === 'pendentes' ? 'encomendas-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('pendentes')}
                                        >
                                            Pendentes
                                        </button>
                                        <button
                                            className={`encomendas-filter-button ${filterStatus === 'entregues' ? 'encomendas-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('entregues')}
                                        >
                                            Entregues
                                        </button>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="encomendas-table-container">
                                    <table className="encomendas-table">
                                        <thead>
                                            <tr className="encomendas-table-header">
                                                <th className="encomendas-th">Destinatário</th>
                                                <th className="encomendas-th">Apartamento</th>
                                                <th className="encomendas-th">Remetente</th>
                                                <th className="encomendas-th">Data Recebimento</th>
                                                <th className="encomendas-th">Status</th>
                                                <th className="encomendas-th">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {encomendasFiltradas.map(encomenda => (
                                                <tr key={encomenda.id} className="encomendas-table-row">
                                                    <td className="encomendas-td">{encomenda.destinatario}</td>
                                                    <td className="encomendas-td">{encomenda.apartamento}</td>
                                                    <td className="encomendas-td">{encomenda.remetente}</td>
                                                    <td className="encomendas-td">{new Date(encomenda.dataRecebimento).toLocaleDateString('pt-BR')}</td>
                                                    <td className="encomendas-td">
                                                        <span className={`encomendas-badge ${encomenda.entregue ? 'encomendas-badge-success' : 'encomendas-badge-pending'}`}>
                                                            {encomenda.entregue ? 'Entregue' : 'Pendente'}
                                                        </span>
                                                    </td>
                                                    <td className="encomendas-td">
                                                        <div className="encomendas-action-buttons">
                                                            {/* Marcar Entregue - Condicional com base em modules.editar */}
                                                            {modules.editar && (
                                                                <button
                                                                    className="encomendas-action-button"
                                                                    onClick={() => handleMarcarEntregue(encomenda.id)}
                                                                    title={encomenda.entregue ? 'Marcar como pendente' : 'Marcar como entregue'}
                                                                >
                                                                    <CheckCircle size={18} color={encomenda.entregue ? '#10b981' : '#9ca3af'} />
                                                                </button>
                                                            )}
                                                            {/* Editar - Condicional com base em modules.editar */}
                                                            {modules.editar && (
                                                                <button
                                                                    className="encomendas-action-button"
                                                                    onClick={() => handleEditar(encomenda)}
                                                                    title="Editar"
                                                                >
                                                                    <Edit size={18} color="#202170" />
                                                                </button>
                                                            )}
                                                            {/* Excluir - Condicional com base em modules.excluir */}
                                                            {modules.excluir && (
                                                                <button
                                                                    className="encomendas-action-button"
                                                                    onClick={() => handleExcluir(encomenda.id)}
                                                                    title="Excluir"
                                                                >
                                                                    <Trash2 size={18} color="#ef4444" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {encomendasFiltradas.length === 0 && (
                                        <div className="encomendas-empty-state">
                                            <Package size={48} color="#9ca3af" />
                                            <p>Nenhuma encomenda encontrada</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Container: Cadastrar - Condicional com base em modules */}
                        {activeContainer === 'cadastrar' && modules.cadastrar && (
                            <div>
                                <h2 className="encomendas-section-title">Cadastrar Nova Encomenda</h2>
                                <div className="encomendas-form-grid">
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Destinatário *</label>
                                        <input
                                            type="text"
                                            value={formData.destinatario}
                                            onChange={(e) => setFormData({ ...formData, destinatario: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Apartamento *</label>
                                        <input
                                            type="text"
                                            value={formData.apartamento}
                                            onChange={(e) => setFormData({ ...formData, apartamento: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Remetente *</label>
                                        <input
                                            type="text"
                                            value={formData.remetente}
                                            onChange={(e) => setFormData({ ...formData, remetente: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Data de Recebimento *</label>
                                        <input
                                            type="date"
                                            value={formData.dataRecebimento}
                                            onChange={(e) => setFormData({ ...formData, dataRecebimento: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                </div>
                                <div className="encomendas-checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={formData.entregue}
                                        onChange={(e) => setFormData({ ...formData, entregue: e.target.checked })}
                                        className="encomendas-checkbox-input"
                                        id="entregue"
                                    />
                                    <label htmlFor="entregue" className="encomendas-checkbox-label">
                                        Marcar como já entregue
                                    </label>
                                </div>
                                <div className="encomendas-button-container">
                                    <button className="encomendas-button-secondary" onClick={() => { resetForm(); setActiveContainer('visualizar'); }}>
                                        <X size={20} />
                                        Cancelar
                                    </button>
                                    <button className="encomendas-button-primary" onClick={handleCadastrar}>
                                        <Plus size={20} />
                                        Cadastrar Encomenda
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Container: Editar - Condicional com base em modules */}
                        {activeContainer === 'editar' && modules.editar && editingId && (
                            <div>
                                <h2 className="encomendas-section-title">Editar Encomenda</h2>
                                <div className="encomendas-form-grid">
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Destinatário *</label>
                                        <input
                                            type="text"
                                            value={formData.destinatario}
                                            onChange={(e) => setFormData({ ...formData, destinatario: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Apartamento *</label>
                                        <input
                                            type="text"
                                            value={formData.apartamento}
                                            onChange={(e) => setFormData({ ...formData, apartamento: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Remetente *</label>
                                        <input
                                            type="text"
                                            value={formData.remetente}
                                            onChange={(e) => setFormData({ ...formData, remetente: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                    <div className="encomendas-form-field">
                                        <label className="encomendas-form-label">Data de Recebimento *</label>
                                        <input
                                            type="date"
                                            value={formData.dataRecebimento}
                                            onChange={(e) => setFormData({ ...formData, dataRecebimento: e.target.value })}
                                            className="encomendas-form-input"
                                        />
                                    </div>
                                </div>
                                <div className="encomendas-checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={formData.entregue}
                                        onChange={(e) => setFormData({ ...formData, entregue: e.target.checked })}
                                        className="encomendas-checkbox-input"
                                        id="entregue-edit"
                                    />
                                    <label htmlFor="entregue-edit" className="encomendas-checkbox-label">
                                        Marcar como entregue
                                    </label>
                                </div>
                                <div className="encomendas-button-container">
                                    <button className="encomendas-button-secondary" onClick={() => { resetForm(); setActiveContainer('visualizar'); }}>
                                        <X size={20} />
                                        Cancelar
                                    </button>
                                    <button className="encomendas-button-primary" onClick={handleSalvarEdicao}>
                                        <CheckCircle size={20} />
                                        Salvar Alterações
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}