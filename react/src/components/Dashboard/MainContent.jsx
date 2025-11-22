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

export default function MainContent() {
  const stats = [
    {
      title: 'Receita Mensal',
      value: 'R$ 248.500',
      change: '+12.5%',
      trend: 'up',
      icon: faChartLine,
      color: '#202170d2'
    },
    {
      title: 'Novos Clientes',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: faUsers,
      color: '#202170d2'
    },
    {
      title: 'Faturas Pendentes',
      value: '23',
      change: '-5.1%',
      trend: 'down',
      icon: faFileInvoiceDollar,
      color: '#202170d2'
    },
    {
      title: 'Encomendas',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: faBox,
      color: '#202170d2'
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

      {/* Stats Grid */}
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

      {/* Quick Actions */}
      <div className="section-header-main">
        <div>
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

      {/* Recent Activities */}
      <div className="section-header-main">
        <div>
          <h2 className="section-title-main">Atividades Recentes</h2>
        </div>
        <a href="#" className="view-all-main">Ver todas</a>
      </div>
      <div className="activities-card-main">
        {recentActivities.map((activity, index) => (
          <div key={index} className="activity-item-main">
            <div className="activity-icon-main" style={{ background: `${activity.color}20`, color: activity.color }}>
              <FontAwesomeIcon icon={activity.icon} />
            </div>
            <div className="activity-content-main">
              <p className="activity-text-main">{activity.text}</p>
              <span className="activity-time-main">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}