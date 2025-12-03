import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faAddressCard,
  faBuilding,
  faUserShield,
  faFileInvoice,
  faBox,
  faChevronDown,
  faChevronUp,
  faList,
  faTachometerAlt,
  faTruck
} from '@fortawesome/free-solid-svg-icons';

// --- DEFINIÇÃO COMPLETA DE TODOS OS LINKS POSSÍVEIS ---
const ALL_MODULES_AND_LINKS = [
  {
    id: 'cadastro', 
    title: 'Módulo Sistema',
    db_code: 'system', 
    items: [
      { icon: faAddressCard, label: 'Registrar Pessoa', link: '/PeopleRegister', permission_code: 'system:registry' }, 
      { icon: faBuilding, label: 'Cadastrar Condominios', link: '/registryCondominius', permission_code: 'system:registry' },
      { icon: faUserShield, label: 'Gerenciar Perfis', link: '/managerProfiles', permission_code: 'system:view' } 
    ]
  },
  {
    id: 'financeiro',
    title: 'Módulo Financeiro',
    db_code: 'finances', 
    items: [
      { icon: faFileInvoice, label: 'Relatórios', link: '/Reports', permission_code: 'finances:view' }
    ]
  },
  {
    id: 'condominio', 
    title: 'Módulo Encomendas',
    db_code: 'orders', 
    items: [
      { icon: faBox, label: 'Encomendas', link: '/Orders', permission_code: 'order:view' },
      { icon: faTruck, label: 'Transportadoras', link: '/Transport', permission_code: 'transport:view' } 
    ]
  }
];

export default function Sidebar() {
  const navigate = useNavigate(); 
  const [userPermissions, setUserPermissions] = useState([]); 
  const [userModules, setUserModules] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [expandedModules, setExpandedModules] = useState({
    cadastro: true, financeiro: false, condominio: false
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);


  // --- 1. EFEITO: CONTROLE DE FECHAMENTO EXTERNO ---
  useEffect(() => {
    function handleClickOutside(event) {
      // Verifica se o clique foi fora da barra lateral
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Não precisamos de um 'else' aqui, o cleanup lida com isso.

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]); // Depende do estado da barra


  // --- 2. EFEITO: BUSCA DE DADOS DA API ---
  useEffect(() => {
    // Atenção: Uso consistente da chave 'token'
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        setLoading(false);
        navigate('/login');
        return; 
    }
    
    fetch('http://localhost:8000/api/users/showIndex', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // CORRIGIDO: Se a chave do token no localStorage foi 'token', a remoção deve ser 'token' ou mudar a leitura acima.
        if (response.status === 401 || !response.ok) {
            localStorage.removeItem('token'); // Use 'token' ou 'authToken' consistentemente
            navigate('/login');
            throw new Error('Unauthorized or Fetch failed');
        }
        return response.json();
    })
    .then(data => {
        if (data.permissions && data.active_modules) {
            setUserPermissions(data.permissions); 
            const modulesFromApi = data.active_modules.map(code => ({
                code: code,
                is_active: true 
            }));
            setUserModules(modulesFromApi);
        }
    })
    .catch(error => {
        console.error("Erro ao carregar permissões da Sidebar:", error);
    })
    .finally(() => {
        setLoading(false); 
    });
        
  }, [navigate]); // Executa apenas na montagem

  
  // --- LÓGICA DE FILTRAGEM (Gera o array que será renderizado) ---
  const visibleModules = ALL_MODULES_AND_LINKS.filter(clientModule => 
    userModules.some(dbModule => 
      dbModule.code === clientModule.db_code && dbModule.is_active
    )
  );

  const finalModules = visibleModules.map(module => ({
    ...module,
    items: module.items.filter(item => 
      userPermissions.includes(item.permission_code)
    )
  }));


  // Lógica de toggleModule
  const toggleModule = (module) => {
    setExpandedModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  
  // Se estiver carregando, mostra o loader
  if (loading) {
      return (
          <div className="sidebar loading-sidebar">
              <span>Carregando módulos...</span>
          </div>
      );
  }

  return (
    <>
      {!sidebarOpen && (
        <button
          className="sidebar-toggle-btn sidebar-open-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}
      >
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faHouse} className="icon-header" />
          <h2>Apeaqui</h2>
        </div>

        <nav className="sidebar-nav dashboard-nav">
          {/* Dashboard Link */}
          <div className="dashboard-section section-dashboard">
            <a href="/dashboard" className="nav-link dashboard-link dashboard-active">
              <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon dashboard-icon-active" />
              <span>Dashboard</span>
            </a>
          </div>

          {finalModules.map((module) => (
            module.items.length > 0 && (
                <div key={module.id} className="module-section">
                    <div
                        className="module-title"
                        onClick={() => toggleModule(module.id)}
                    >
                        <span>{module.title}</span>
                        <FontAwesomeIcon
                            icon={
                            expandedModules[module.id]
                                ? faChevronUp
                                : faChevronDown
                            }
                            className="chevron-icon"
                        />
                    </div>

                    <div
                        className={`module-items ${expandedModules[module.id]
                            ? 'expanded'
                            : 'collapsed'
                        }`}
                    >
                        {module.items.map((item, index) => (
                            <a key={index} href={item.link} className="nav-link">
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="nav-icon"
                                />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )
          ))}
        </nav>
      </div>
    </>
  );
}