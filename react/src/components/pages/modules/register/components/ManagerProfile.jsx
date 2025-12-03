import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    User, Shield, Check, X, ChevronDown, ChevronUp, Search, UserCog, DollarSign,
    UserCheck, Building, FileText, Settings, Box
} from 'lucide-react';
import './css/css.css'; // Certifique-se de que este caminho CSS está correto

// Define a URL base para evitar repetição
const BASE_URL = 'http://localhost:8000/api';

// Mapeamento de ícones para os módulos
const getModuleIcon = (moduleCode) => {
    const iconMap = {
        financeiro: <DollarSign size={24} color='#202170' strokeWidth={2.8} />,
        usuarios: <User size={24} color='#202170' strokeWidth={2.8} />,
        clientes: <UserCheck size={24} color='#202170' strokeWidth={2.8} />,
        apartamentos: <Building size={24} color='#202170' strokeWidth={2.8} />,
        relatorios: <FileText size={24} color='#202170' strokeWidth={2.8} />,
        encomendas: <Box size={24} color='#202170' strokeWidth={2.8} />,
        configuracoes: <Settings size={24} color='#202170' strokeWidth={2.8} />,
    };
    return iconMap[moduleCode.toLowerCase()] || <Settings size={24} color='#202170' strokeWidth={2.8} />;
};


export default function ManagerProfile() {
    const [users, setUsers] = useState([]);
    const [modules, setModules] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activePermissionIds, setActivePermissionIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [expandedModules, setExpandedModules] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    // 1. CARREGAR DADOS INICIAIS E CONFIGURAR AUTENTICAÇÃO
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // CORREÇÃO CRÍTICA: CONSISTÊNCIA DA CHAVE DO TOKEN.
                // MUDANÇA: Use 'token' (minúsculo) se o seu código de login o armazena assim.
                const authToken = localStorage.getItem('token');

                if (authToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                } else {
                    // Se não houver token, define um erro de autenticação antes de tentar as chamadas
                    throw new Error('Token de autenticação não encontrado. Faça login novamente.');
                }

                // 1. Busca de Usuários
                const usersResponse = await axios.get(`${BASE_URL}/usersShow`);
                setUsers(usersResponse.data.map(u => ({
                    id: u.id,
                    nome: u.name,
                    email: u.email,
                    cargo: u.is_admin ? 'Administrador' : 'Padrão'
                })));

                // 2. Busca de Módulos e Permissões
                const modulesResponse = await axios.get(`${BASE_URL}/modules/permissions`);
                setModules(modulesResponse.data);

            } catch (err) {
                console.error('Erro ao carregar dados:', err);

                const status = err.response?.status;
                let errorDetail = err.message || 'Verifique a rede e as configurações de CORS.';

                // Se a requisição retornar 401 ou 403, o token é inválido/expirado
                if (status === 401 || status === 403) {
                    errorDetail = `Acesso negado (Status ${status}). Token inválido ou expirado. Tente fazer login novamente.`;
                    // Opcional: Remover o token do localStorage se for 401/403
                    localStorage.removeItem('token');
                } else if (status) {
                    errorDetail = `Erro de Servidor (Status ${status}).`;
                }

                setError(`Não foi possível carregar os dados iniciais. ${errorDetail}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    // 2. CARREGAR PERMISSÕES DO USUÁRIO SELECIONADO
    const fetchUserPermissions = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
            // Usa o cabeçalho Authorization já definido globalmente
            const response = await axios.get(`${BASE_URL}/users/${userId}/permissions`);
            setActivePermissionIds(response.data.active_permissions);
        } catch (err) {
            console.error('Erro ao carregar permissões do usuário:', err);
            // Verifica se o erro é 401/403 e ajusta a mensagem
            const status = err.response?.status;
            let errorMessage = 'Não foi possível carregar as permissões do usuário. Falha de comunicação.';
            if (status === 401 || status === 403) {
                errorMessage = 'Sessão inválida ao tentar buscar permissões. Recarregue a página.';
            }
            setError(errorMessage);
            setActivePermissionIds([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchUserPermissions(user.id);
    };


    // 3. LÓGICA DE ALTERNÂNCIA (Toggle)

    const toggleModule = (moduleCode) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleCode]: !prev[moduleCode]
        }));
    };

    const togglePermission = (permissionId) => {
        setActivePermissionIds(prevIds => {
            if (prevIds.includes(permissionId)) {
                return prevIds.filter(id => id !== permissionId);
            } else {
                return [...prevIds, permissionId];
            }
        });
    };

    const toggleAllPermissions = (modulePermissions, enable) => {
        const modulePermissionIds = modulePermissions.map(p => p.id);

        setActivePermissionIds(prevIds => {
            const otherIds = prevIds.filter(id => !modulePermissionIds.includes(id));

            if (enable) {
                return [...otherIds, ...modulePermissionIds];
            } else {
                return otherIds;
            }
        });
    };


    // 4. SUBMISSÃO DE DADOS
    const handleSubmit = async () => {
        if (!selectedUser) return;

        setIsLoading(true);
        setError(null);

        try {
            // Envia APENAS o array de IDs das permissões ativas
            await axios.put(`${BASE_URL}/users/${selectedUser.id}/permissions`, {
                permission_ids: activePermissionIds
            });

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            console.error('Erro ao salvar permissões:', err);
            setError('Erro ao salvar as permissões. Código: ' + (err.response?.status || 'desconhecido'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setSearchTerm('');
        setActivePermissionIds([]);
    };


    // Filtragem de usuários
    const filteredUsers = users.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- INÍCIO DA RENDERIZAÇÃO ---

    return (
        <div className="page-wrapper">
            <div className="card">
                {/* Header */}
                <div className="card-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <UserCog size={32} />
                        </div>
                        <div>
                            <h1 className="header-title">Gerenciamento de Perfil</h1>
                            <p className="header-subtitle">Selecione um usuário e configure suas permissões de acesso</p>
                        </div>
                    </div>
                </div>

                {/* Loading e Erro */}
                {isLoading && (
                    <div className="loading-message">
                        <UserCog size={20} className="spin-animation" />
                        <span className="loading-text">Carregando dados...</span>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <X size={20} />
                        <span className="error-text">Erro: {error}</span>
                    </div>
                )}

                {/* Success Message */}
                {submitted && (
                    <div className="success-message">
                        <Check size={20} />
                        <span className="success-text">Permissões atualizadas com sucesso!</span>
                    </div>
                )}

                {/* Form Content */}
                <div className="form-content">
                    {/* Seleção de Usuário */}
                    <div className="form-section">
                        <h3 className="section-title">Selecionar Usuário</h3>

                        <div className="input-wrapper" style={{ marginBottom: '20px' }}>
                            <Search className="input-icon" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar usuário por nome ou email..."
                                className="form-input"
                            />
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '12px',
                            marginBottom: '20px'
                        }}>
                            {filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '16px',
                                        border: selectedUser?.id === user.id ? '2px solid #202170' : '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        background: selectedUser?.id === user.id ? 'rgba(32, 33, 112, 0.05)' : 'white'
                                    }}
                                >
                                    {/* ... (Estilo do usuário) */}
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #202170 0%, #161750 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0
                                    }}>
                                        <User size={20} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{user.nome}</div>
                                        <div style={{ fontSize: '13px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                                    </div>
                                    <div style={{
                                        padding: '4px 12px', background: '#f3f4f6', borderRadius: '6px',
                                        fontSize: '12px', fontWeight: '500', color: '#4b5563'
                                    }}>{user.cargo}</div>
                                    {selectedUser?.id === user.id && (
                                        <div style={{
                                            position: 'absolute', top: '8px', right: '8px', width: '24px',
                                            height: '24px', borderRadius: '50%', background: '#10b981',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Check size={18} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {filteredUsers.length === 0 && !isLoading && (
                                <div style={{ color: '#9ca3af', gridColumn: '1 / -1', textAlign: 'center', padding: '20px', border: '1px dashed #e5e7eb', borderRadius: '12px' }}>
                                    Nenhum usuário encontrado.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Permissões */}
                    {selectedUser && (
                        <div className="section-divider">
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '16px', padding: '20px',
                                background: 'linear-gradient(135deg, #202170 0%, #161750 100%)',
                                color: 'white', borderRadius: '12px', marginBottom: '24px'
                            }}>
                                <Shield size={24} />
                                <div>
                                    <div style={{ fontSize: '13px', opacity: '0.9', marginBottom: '4px' }}>
                                        Configurando permissões para:
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: '600' }}>
                                        {selectedUser.nome}
                                    </div>
                                </div>
                            </div>

                            <h3 className="section-title">Módulos e Permissões</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {modules.map(module => {
                                    const moduleKey = module.code;
                                    const isExpanded = expandedModules[moduleKey];
                                    const modulePermissions = module.permissions;
                                    const totalCount = modulePermissions.length;

                                    const enabledCount = modulePermissions.filter(p => activePermissionIds.includes(p.id)).length;
                                    const allEnabled = enabledCount === totalCount && totalCount > 0;

                                    return (
                                        <div key={module.id} style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Cabeçalho do Módulo */}
                                            <div
                                                onClick={() => toggleModule(moduleKey)}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '20px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s ease'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    {getModuleIcon(module.code)}
                                                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                                                        {module.title}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '13px',
                                                        color: '#6b7280',
                                                        padding: '4px 10px',
                                                        background: '#f3f4f6',
                                                        borderRadius: '6px'
                                                    }}>
                                                        {enabledCount} / {totalCount} ativas
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
                                                    {/* Botão Marcar/Desmarcar Todas */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleAllPermissions(modulePermissions, !allEnabled);
                                                        }}
                                                        style={{
                                                            padding: '8px 16px',
                                                            border: allEnabled ? '1px solid #202170' : '1px solid #e5e7eb',
                                                            borderRadius: '8px',
                                                            background: allEnabled ? 'linear-gradient(135deg, #202170 0%, #161750 100%)' : 'white',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            color: allEnabled ? 'white' : '#4b5563',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        {allEnabled ? 'Desmarcar Todas' : 'Marcar Todas'}
                                                    </button>
                                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </div>
                                            </div>

                                            {/* Permissões do Módulo */}
                                            {isExpanded && (
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                                    gap: '12px',
                                                    padding: '20px',
                                                    borderTop: '1px solid #e5e7eb',
                                                    background: '#f9fafb'
                                                }}>
                                                    {modulePermissions.map(permission => {
                                                        const isEnabled = activePermissionIds.includes(permission.id);
                                                        return (
                                                            <div
                                                                key={permission.id}
                                                                onClick={() => togglePermission(permission.id)}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '12px',
                                                                    background: isEnabled ? 'rgba(32, 33, 112, 0.05)' : 'white',
                                                                    borderRadius: '8px',
                                                                    border: isEnabled ? '1px solid #202170' : '1px solid #e5e7eb',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                            >
                                                                <div style={{
                                                                    width: '20px', height: '20px',
                                                                    border: isEnabled ? '2px solid #202170' : '2px solid #d1d5db',
                                                                    borderRadius: '6px', display: 'flex', alignItems: 'center',
                                                                    justifyContent: 'center', flexShrink: 0, color: 'white',
                                                                    background: isEnabled ? 'linear-gradient(135deg, #202170 0%, #161750 100%)' : 'transparent',
                                                                    transition: 'all 0.2s ease'
                                                                }}>
                                                                    {isEnabled && <Check size={14} />}
                                                                </div>
                                                                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                                                                    {permission.description}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    {selectedUser && (
                        <div className="button-container">
                            <button onClick={handleSubmit} className="button-primary" disabled={isLoading}>
                                <Check size={20} />
                                {isLoading ? 'Salvando...' : 'Salvar Permissões'}
                            </button>
                            <button onClick={handleCancel} className="button-secondary" disabled={isLoading}>
                                <X size={20} />
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <br></br><br></br>
        </div>
    );
}