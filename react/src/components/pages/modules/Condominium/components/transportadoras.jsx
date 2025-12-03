import React, { useState } from 'react';
import { Truck, Plus, Edit, Trash2, Eye, Search, CheckCircle, X, Phone, Mail } from 'lucide-react';
import './css/transportadores.css';

export default function Transportadores({UserData}) {

    const modules = {
        visualizar: true,
        cadastrar: true,
        editar: true,
        excluir: true
    };

    // Estados
    const [transportadores, setTransportadores] = useState([
        { id: 1, nome: 'Transportadora Rápida Ltda', cnpj: '12.345.678/0001-90', telefone: '(11) 98765-4321', email: 'contato@rapida.com.br', ativo: true },
        { id: 2, nome: 'Express Logística', cnpj: '98.765.432/0001-10', telefone: '(11) 97654-3210', email: 'express@logistica.com.br', ativo: true },
        { id: 3, nome: 'Veloz Entregas', cnpj: '45.678.901/0001-23', telefone: '(11) 96543-2109', email: 'veloz@entregas.com.br', ativo: false },
        { id: 4, nome: 'Mega Transport', cnpj: '23.456.789/0001-45', telefone: '(11) 95432-1098', email: 'mega@transport.com.br', ativo: true },
    ]);

    const [showSuccess, setShowSuccess] = useState(false);
    const [activeContainer, setActiveContainer] = useState('visualizar');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        telefone: '',
        email: '',
        ativo: true
    });

    // Funções auxiliares
    const resetForm = () => {
        setFormData({
            nome: '',
            cnpj: '',
            telefone: '',
            email: '',
            ativo: true
        });
        setEditingId(null);
    };

    const handleSuccess = (message) => {
        setShowSuccess(message);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // CRUD Operations
    const handleCadastrar = () => {
        if (!formData.nome || !formData.cnpj || !formData.telefone || !formData.email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const novoTransportador = {
            id: Date.now(),
            ...formData
        };
        setTransportadores([...transportadores, novoTransportador]);
        handleSuccess('Transportador cadastrado com sucesso!');
        resetForm();
        setActiveContainer('visualizar');
    };

    const handleEditar = (transportador) => {
        setFormData(transportador);
        setEditingId(transportador.id);
        setActiveContainer('editar');
    };

    const handleSalvarEdicao = () => {
        if (!formData.nome || !formData.cnpj || !formData.telefone || !formData.email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setTransportadores(transportadores.map(trans =>
            trans.id === editingId ? { ...formData, id: editingId } : trans
        ));
        handleSuccess('Transportador atualizado com sucesso!');
        resetForm();
        setActiveContainer('visualizar');
    };

    const handleExcluir = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este transportador?')) {
            setTransportadores(transportadores.filter(trans => trans.id !== id));
            handleSuccess('Transportador excluído com sucesso!');
        }
    };

    const handleToggleStatus = (id) => {
        setTransportadores(transportadores.map(trans =>
            trans.id === id ? { ...trans, ativo: !trans.ativo } : trans
        ));
        handleSuccess('Status atualizado!');
    };

    // Filtros
    const transportadoresFiltrados = transportadores.filter(trans => {
        const matchSearch = trans.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trans.cnpj.includes(searchTerm) ||
            trans.telefone.includes(searchTerm) ||
            trans.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'todos' ||
            (filterStatus === 'ativos' && trans.ativo) ||
            (filterStatus === 'inativos' && !trans.ativo);
        return matchSearch && matchStatus;
    });

    const stats = {
        total: transportadores.length,
        ativos: transportadores.filter(t => t.ativo).length,
        inativos: transportadores.filter(t => !t.ativo).length
    };

    return (
        <div className="transportadores-page-container">
            <div className="transportadores-page-wrapper">
                <div className="transportadores-card">
                    <div className="transportadores-card-header">
                        <div className='transportadores-header-content'>
                            <div className="transportadores-header-icon">
                                <Truck size={32} />
                            </div>
                            <div>
                                <h1 className="transportadores-header-title">Gestão de Transportadores</h1>
                                <p className="transportadores-header-subtitle">Controle completo de transportadores do condomínio</p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className='transportadores-success-message'>
                            <CheckCircle size={20} />
                            <span className="transportadores-success-text">{showSuccess}</span>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="transportadores-navigation">
                        {modules.visualizar && (
                            <button
                                className={`transportadores-nav-button ${activeContainer === 'visualizar' ? 'transportadores-nav-button-active' : ''}`}
                                onClick={() => { setActiveContainer('visualizar'); resetForm(); }}
                            >
                                <Eye size={18} />
                                Visualizar
                            </button>
                        )}
                        {modules.cadastrar && (
                            <button
                                className={`transportadores-nav-button ${activeContainer === 'cadastrar' ? 'transportadores-nav-button-active' : ''}`}
                                onClick={() => { setActiveContainer('cadastrar'); resetForm(); }}
                            >
                                <Plus size={18} />
                                Cadastrar
                            </button>
                        )}
                        {modules.editar && editingId && (
                            <button
                                className={`transportadores-nav-button ${activeContainer === 'editar' ? 'transportadores-nav-button-active' : ''}`}
                                onClick={() => setActiveContainer('editar')}
                            >
                                <Edit size={18} />
                                Editar
                            </button>
                        )}
                    </div>

                    <div className="transportadores-form-content">
                        {/* Container: Visualizar */}
                        {activeContainer === 'visualizar' && modules.visualizar && (
                            <div>
                                {/* Stats Cards */}
                                <div className="transportadores-stats-grid">
                                    <div className="transportadores-stat-card">
                                        <Truck size={24} color="#202170" />
                                        <div>
                                            <div className="transportadores-stat-value">{stats.total}</div>
                                            <div className="transportadores-stat-label">Total</div>
                                        </div>
                                    </div>
                                    <div className="transportadores-stat-card">
                                        <CheckCircle size={24} color="#10b981" />
                                        <div>
                                            <div className="transportadores-stat-value">{stats.ativos}</div>
                                            <div className="transportadores-stat-label">Ativos</div>
                                        </div>
                                    </div>
                                    <div className="transportadores-stat-card">
                                        <X size={24} color="#ef4444" />
                                        <div>
                                            <div className="transportadores-stat-value">{stats.inativos}</div>
                                            <div className="transportadores-stat-label">Inativos</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="transportadores-filters-container">
                                    <div className="transportadores-search-container">
                                        <Search size={20} className="transportadores-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Buscar por nome, CNPJ, telefone ou e-mail..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="transportadores-search-input"
                                        />
                                    </div>
                                    <div className="transportadores-filter-buttons">
                                        <button
                                            className={`transportadores-filter-button ${filterStatus === 'todos' ? 'transportadores-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('todos')}
                                        >
                                            Todos
                                        </button>
                                        <button
                                            className={`transportadores-filter-button ${filterStatus === 'ativos' ? 'transportadores-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('ativos')}
                                        >
                                            Ativos
                                        </button>
                                        <button
                                            className={`transportadores-filter-button ${filterStatus === 'inativos' ? 'transportadores-filter-button-active' : ''}`}
                                            onClick={() => setFilterStatus('inativos')}
                                        >
                                            Inativos
                                        </button>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="transportadores-table-container">
                                    <table className="transportadores-table">
                                        <thead>
                                            <tr className="transportadores-table-header">
                                                <th className="transportadores-th">Nome</th>
                                                <th className="transportadores-th">CNPJ</th>
                                                <th className="transportadores-th">Telefone</th>
                                                <th className="transportadores-th">E-mail</th>
                                                <th className="transportadores-th">Status</th>
                                                <th className="transportadores-th">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transportadoresFiltrados.map(transportador => (
                                                <tr key={transportador.id} className="transportadores-table-row">
                                                    <td className="transportadores-td">{transportador.nome}</td>
                                                    <td className="transportadores-td">{transportador.cnpj}</td>
                                                    <td className="transportadores-td">{transportador.telefone}</td>
                                                    <td className="transportadores-td">{transportador.email}</td>
                                                    <td className="transportadores-td">
                                                        <span className={`transportadores-badge ${transportador.ativo ? 'transportadores-badge-success' : 'transportadores-badge-pending'}`}>
                                                            {transportador.ativo ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                    </td>
                                                    <td className="transportadores-td">
                                                        <div className="transportadores-action-buttons">
                                                            <button
                                                                className="transportadores-action-button"
                                                                onClick={() => handleToggleStatus(transportador.id)}
                                                                title={transportador.ativo ? 'Desativar' : 'Ativar'}
                                                            >
                                                                <CheckCircle size={18} color={transportador.ativo ? '#10b981' : '#9ca3af'} />
                                                            </button>
                                                            {modules.editar && (
                                                                <button
                                                                    className="transportadores-action-button"
                                                                    onClick={() => handleEditar(transportador)}
                                                                    title="Editar"
                                                                >
                                                                    <Edit size={18} color="#202170" />
                                                                </button>
                                                            )}
                                                            {modules.excluir && (
                                                                <button
                                                                    className="transportadores-action-button"
                                                                    onClick={() => handleExcluir(transportador.id)}
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
                                    {transportadoresFiltrados.length === 0 && (
                                        <div className="transportadores-empty-state">
                                            <Truck size={48} color="#9ca3af" />
                                            <p>Nenhum transportador encontrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Container: Cadastrar */}
                        {activeContainer === 'cadastrar' && modules.cadastrar && (
                            <div>
                                <h2 className="transportadores-section-title">Cadastrar Novo Transportador</h2>
                                <div className="transportadores-form-grid">
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">Nome da Empresa *</label>
                                        <input
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="transportadores-form-input"
                                            placeholder="Ex: Transportadora Rápida Ltda"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">CNPJ *</label>
                                        <input
                                            type="text"
                                            value={formData.cnpj}
                                            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                                            className="transportadores-form-input"
                                            placeholder="00.000.000/0000-00"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">Telefone *</label>
                                        <input
                                            type="text"
                                            value={formData.telefone}
                                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                            className="transportadores-form-input"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">E-mail *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="transportadores-form-input"
                                            placeholder="contato@empresa.com.br"
                                        />
                                    </div>
                                </div>
                                <div className="transportadores-checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={formData.ativo}
                                        onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                                        className="transportadores-checkbox-input"
                                        id="ativo"
                                    />
                                    <label htmlFor="ativo" className="transportadores-checkbox-label">
                                        Transportador ativo
                                    </label>
                                </div>
                                <div className="transportadores-button-container">
                                    <button className="transportadores-button-secondary" onClick={() => { resetForm(); setActiveContainer('visualizar'); }}>
                                        <X size={20} />
                                        Cancelar
                                    </button>
                                    <button className="transportadores-button-primary" onClick={handleCadastrar}>
                                        <Plus size={20} />
                                        Cadastrar Transportador
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Container: Editar */}
                        {activeContainer === 'editar' && modules.editar && editingId && (
                            <div>
                                <h2 className="transportadores-section-title">Editar Transportador</h2>
                                <div className="transportadores-form-grid">
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">Nome da Empresa *</label>
                                        <input
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="transportadores-form-input"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">CNPJ *</label>
                                        <input
                                            type="text"
                                            value={formData.cnpj}
                                            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                                            className="transportadores-form-input"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">Telefone *</label>
                                        <input
                                            type="text"
                                            value={formData.telefone}
                                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                            className="transportadores-form-input"
                                        />
                                    </div>
                                    <div className="transportadores-form-field">
                                        <label className="transportadores-form-label">E-mail *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="transportadores-form-input"
                                        />
                                    </div>
                                </div>
                                <div className="transportadores-checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={formData.ativo}
                                        onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                                        className="transportadores-checkbox-input"
                                        id="ativo-edit"
                                    />
                                    <label htmlFor="ativo-edit" className="transportadores-checkbox-label">
                                        Transportador ativo
                                    </label>
                                </div>
                                <div className="transportadores-button-container">
                                    <button className="transportadores-button-secondary" onClick={() => { resetForm(); setActiveContainer('visualizar'); }}>
                                        <X size={20} />
                                        Cancelar
                                    </button>
                                    <button className="transportadores-button-primary" onClick={handleSalvarEdicao}>
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