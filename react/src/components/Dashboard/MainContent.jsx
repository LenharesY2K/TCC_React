import React, { useState, useEffect } from 'react';
// IMPORTANTE: Manter estes imports originais, mesmo que o ambiente de arquivo único 
// possa não conseguir resolvê-los. A lógica de FontAwesomeIcon será adaptada internamente.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faUsers,
  faFileInvoiceDollar,
  faBox,
  faArrowTrendUp,
  faArrowTrendDown,
  faRocket,
  faSearch,
  faBell,
  faClipboardCheck,
  faGear
} from '@fortawesome/free-solid-svg-icons';
// Manter os imports de CSS originais (que não serão resolvidos no ambiente de arquivo único)
import './css/main.css';
import './css/graphics.css';

// Para o ambiente de arquivo único, usaremos os ícones Font Awesome originais 
// nas definições de dados, mas adaptamos a lógica para a chamada da API.

export default function MainContent() {
  // Estado para armazenar as permissões do usuário
  const [userPermissions, setUserPermissions] = useState([]);
  // Estado para gerenciar o carregamento da API
  const [isLoading, setIsLoading] = useState(true);
  // Estado para gerenciar erros
  const [error, setError] = useState(null);
  
  // A função navigate não estava definida no componente original, mas é necessária
  // para simular a navegação (caso contrário, a chamada da função dá erro).
  // Se estiver usando react-router-dom, deve-se usar useNavigate().
  const navigate = (path) => {
    console.log(`Navegando para: ${path}`);
    // Simulação: em um aplicativo real, isso seria navigate(path);
  };
  
  // --- DEFINIÇÃO DE DADOS ORIGINAIS ---
  const stats = [
    {
      title: 'Receita Mensal',
      value: 'R$ 248.500',
      change: '+12.5%',
      trend: 'up',
      icon: faChartLine,
      color: '#202170'
    },
    {
      title: 'Novos Clientes',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: faUsers,
      color: '#202170'
    },
    {
      title: 'Faturas Pendentes',
      value: '23',
      change: '-5.1%',
      trend: 'down',
      icon: faFileInvoiceDollar,
      color: '#202170'
    },
    {
      title: 'Encomendas',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: faBox,
      color: '#202170'
    }
  ];

  const recentActivities = [
    { text: 'Nova encomenda registrada para Apto 301', time: 'há 5 min', icon: faBox, color: '#5aa0e6' },
    { text: 'Fatura #1247 foi aprovada', time: 'há 15 min', icon: faFileInvoiceDollar, color: '#5aa0e6' },
    { text: '3 novos moradores cadastrados', time: 'há 1 hora', icon: faUsers, color: '#5aa0e6' },
    { text: 'Relatório mensal gerado', time: 'há 2 horas', icon: faClipboardCheck, color: '#5aa0e6' }
  ];

  // Ações Rápidas, adicionando o campo 'permission_code' para a lógica de filtragem
  const quickActions = [
    // Requer permissão para registrar pessoas/usuários
    { 
      title: 'Registrar Pessoa', 
      icon: faUsers, 
      color: '#3b82f6', 
      description: 'Adicione um novo cadastro', 
      href: '/PeopleRegister',
      permission_code: 'system:registry' // Código de permissão da API
    },
    // Requer permissão para registrar encomendas
    { 
      title: 'Nova Encomenda', 
      icon: faBox, 
      color: '#8b5cf6', 
      description: 'Registre uma entrega',
      href: '/NewOrder', // Adicionado href
      permission_code: 'order:register' // Código de permissão da API
    },
    // Requer permissão para gerar relatórios ou visualizar finanças
    { 
      title: 'Gerar Relatório', 
      icon: faClipboardCheck, 
      color: '#10b981', 
      description: 'Crie relatórios personalizados',
      href: '/Reports', // Adicionado href
      permission_code: 'finances:view' // Código de permissão da API
    },
    // Requer permissão para configurações de sistema
    { 
      title: 'Configurações', 
      icon: faGear, 
      color: '#6b7280', 
      description: 'Ajuste preferências',
      href: '/Settings', // Adicionado href
      permission_code: 'system:view' // Código de permissão da API
    }
  ];
  
  // Permissão necessária para o gráfico (pode ser diferente, mas usamos 'finances:view' como exemplo)
  const FINANCIAL_PERMISSION = 'finances:view';
  
  // --- LÓGICA DE CHAMADA DA API ---
  useEffect(() => {
    const fetchPermissions = async () => {
      // 1. Obter o token de autenticação (simulado como localStorage)
      const token = localStorage.getItem('token'); 
      if (!token) {
        // Se não houver token, simula-se um erro e não se carrega nada
        setError("Token de autenticação não encontrado. Redirecionando para login.");
        setIsLoading(false);
        // Em um ambiente real, você usaria `Maps('/login')` aqui
        return; 
      }
      
      try {
        // Implementação de backoff exponencial para retentar em caso de falha temporária
        const maxRetries = 3;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            // URL de exemplo para a API que retorna as permissões do usuário logado
            const response = await fetch('http://localhost:8000/api/users/showIndex', {
                method: 'GET',
                headers: {
                    // Adiciona o token ao cabeçalho de Autorização
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401 || response.status === 403) {
                // Não autorizado ou proibido - limpa o token e força logout (simulado)
                localStorage.removeItem('authToken');
                setError('Sessão expirada ou não autorizada. Faça login novamente.');
                setIsLoading(false);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                
                // A API deve retornar um objeto com um array de permissões
                if (data.permissions && Array.isArray(data.permissions)) {
                    setUserPermissions(data.permissions); 
                } else {
                    // Fallback: Se a API retornar sucesso, mas o formato estiver errado
                    console.warn("API retornou sucesso, mas o formato de permissões é inválido. Usando permissões padrão.");
                    // Simulação de permissões se a API não funcionar corretamente (apenas para DEV)
                    setUserPermissions(['system:registry', 'order:register', 'finances:view', 'system:view']); 
                }
                setIsLoading(false);
                return; // Sucesso, sai da função
            } else if (attempt < maxRetries - 1) {
                // Esperar e tentar novamente (1s, 2s, 4s)
                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // Última tentativa falhou
                throw new Error(`Erro ${response.status}: Falha ao carregar permissões.`);
            }
        }
        
      } catch (err) {
          console.error("Erro ao carregar permissões:", err);
          setError(err.message || 'Erro de rede. Verifique a conexão com a API.');
          setIsLoading(false);
      }
    };
    fetchPermissions();
  }, []); // O array de dependências vazio garante que o efeito só seja executado uma vez
  
  
  // --- FILTRAGEM DE AÇÕES RÁPIDAS ---
  // Filtra as ações rápidas que o usuário tem permissão para ver
  const authorizedQuickActions = quickActions.filter(action =>
    userPermissions.includes(action.permission_code)
  );

  // Verifica se o usuário pode visualizar o gráfico
  const canViewFinancialChart = userPermissions.includes(FINANCIAL_PERMISSION);

  
  // --- RENDERIZAÇÃO CONDICIONAL POR ESTADO ---
  
  if (isLoading) {
      // Usando FontAwesomeIcon para o carregamento
      return (
          <div className="flex justify-center items-center h-screen text-lg text-gray-600">
              {/* Note: Não existe um ícone nativo de "girar/loader" em fa, mas sim em FontAwesome */}
              <FontAwesomeIcon icon={faGear} spin className="mr-2 h-6 w-6" />
              Carregando dados do dashboard e permissões...
          </div>
      );
  }

  if (error) {
    // Exibe a mensagem de erro da API
    return (
        <div className="flex justify-center items-center h-screen text-red-600 p-8">
            <h2 className="section-title-main text-red-600">Erro de Sistema</h2>
            <p className="sub-text mt-4 text-red-500">{error}</p>
            <p className="sub-text mt-2 text-gray-500">Por favor, verifique a sua conexão ou contate o suporte.</p>
        </div>
    );
  }


  // --- RENDERIZAÇÃO PRINCIPAL DO DASHBOARD ---

  return (
    <>
      <div className="hero-section-main">
        <div className="hero-content-main">
          <div className="hero-badge-main">
            <FontAwesomeIcon icon={faRocket} />
            <span>Sistema M2NPS</span>
          </div>
          <h1 className="welcome-text">Bem-vindo! 👋</h1>
          <p className="sub-text">
            Seu ambiente de trabalho está carregado e pronto para uso.
            Utilize o menu lateral ou a barra de pesquisa para navegar.
          </p>

        </div>
        <div className="hero-illustration-main">
          <div className="floating-card-main card-1-main">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className="floating-card-main card-2-main">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="floating-card-main card-3-main">
            <FontAwesomeIcon icon={faBox} />
          </div>
        </div>
      </div>

      <div className="stats-grid-main">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-main">
            <div className="stat-icon-main" style={{ background: `${stat.color}20`, color: stat.color }}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-content-main">
              <p className="stat-title-main">{stat.title}</p>
              <div className="stat-value-row-main">
                <h3 className="stat-value-main">{stat.value}</h3>
                <span className={`stat-change-main ${stat.trend}`}>
                  <FontAwesomeIcon
                    icon={stat.trend === 'up' ? faArrowTrendUp : faArrowTrendDown}
                  />
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header-main">
        <div className="section-header-content-main">
          <h2 className="section-title-main">Ações Rápidas</h2>
          <p className="section-subtitle-main">Acesse as funcionalidades mais usadas</p>
        </div>
      </div>
      
      {/* --- Exibe APENAS as ações que o usuário tem permissão --- */}
      {authorizedQuickActions.length > 0 ? (
        <div className="quick-actions-grid-main">
          {authorizedQuickActions.map((action, index) => (
            <button
              key={index}
              className="action-card-main"
              onClick={() => navigate(action.href)}
            >
              <div
                className="action-icon-main"
                style={{ background: `${action.color}20`, color: action.color }}
              >
                <FontAwesomeIcon icon={action.icon} />
              </div>

              <div className="action-content-main">
                <h4>{action.title}</h4>
                <p>{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p></p>

      )}


      {/* --- Gráfico é exibido APENAS se o usuário tiver a permissão necessária --- */}
      {canViewFinancialChart ? (
        <div className="dashboard-card-chart">
          <div className="card-header-chart">
            <h2 className="section-title-chart">Desempenho Mensal</h2>
            <select className="chart-period-select">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Últimos 3 meses</option>
            </select>
          </div>
          <div className="chart-container-chart">
            <div className="chart-bars-chart">
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '60%', background: '#5aa0e6' }}></div>
                <span className="bar-label-chart">Seg</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '75%', background: '#202170' }}></div>
                <span className="bar-label-chart">Ter</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '55%', background: '#5aa0e6' }}></div>
                <span className="bar-label-chart">Qua</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '85%', background: '#202170' }}></div>
                <span className="bar-label-chart">Qui</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '70%', background: '#5aa0e6' }}></div>
                <span className="bar-label-chart">Sex</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '45%', background: '#202170' }}></div>
                <span className="bar-label-chart">Sáb</span>
              </div>
              <div className="bar-wrapper-chart">
                <div className="bar-chart" style={{ height: '35%', background: '#5aa0e6' }}></div>
                <span className="bar-label-chart">Dom</span>
              </div>
            </div>
            <div className="chart-stats-chart">
              <div className="chart-stat-item-chart">
                <span className="chart-stat-label-chart">Total</span>
                <span className="chart-stat-value-chart">R$ 3124.R$</span>
              </div>
              <div className="chart-stat-item-chart">
                <span className="chart-stat-label-chart">Média</span>
                <span className="chart-stat-value-chart">R$ 302.8R$</span>
              </div>
              <div className="chart-stat-item-chart">
                <span className="chart-stat-label-chart">Crescimento</span>
                <span className="chart-stat-value-chart success">+12.5%</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
            <p ></p>
      )}
      <br></br>
    </>
  );
}