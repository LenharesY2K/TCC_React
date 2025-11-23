import React from 'react';
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
import './css/main.css';
import './css/graphics.css';

export default function MainContent() {
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

  const quickActions = [
    { title: 'Registrar Pessoa', icon: faUsers, color: '#3b82f6', description: 'Adicione um novo cadastro' },
    { title: 'Nova Encomenda', icon: faBox, color: '#8b5cf6', description: 'Registre uma entrega' },
    { title: 'Gerar Relatório', icon: faClipboardCheck, color: '#10b981', description: 'Crie relatórios personalizados' },
    { title: 'Configurações', icon: faGear, color: '#6b7280', description: 'Ajuste preferências' }
  ];

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
      <div className="quick-actions-grid-main">
        {quickActions.map((action, index) => (
          <button key={index} className="action-card-main">
            <div className="action-icon-main" style={{ background: `${action.color}20`, color: action.color }}>
              <FontAwesomeIcon icon={action.icon} />
            </div>
            <div className="action-content-main">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>

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
      <br></br>
    </>
  );
}