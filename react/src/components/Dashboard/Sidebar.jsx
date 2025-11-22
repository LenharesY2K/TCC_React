import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faAddressCard,
  faBuilding,
  faUserShield,
  faDollarSign,
  faFileInvoice,
  faBox,
  faUsers,
  faChevronDown,
  faChevronUp,
  faBars
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [expandedModules, setExpandedModules] = useState({
    cadastro: true,
    financeiro: false,
    condominio: false
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarRef = useRef(null);

  const toggleModule = (module) => {
    setExpandedModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  const modules = [
    {
      id: 'cadastro',
      title: 'Módulo Cadastro',
      items: [
        { icon: faAddressCard, label: 'Registrar Pessoa', link: '#' },
        { icon: faBuilding, label: 'Cadastrar Empresa', link: '#' },
        { icon: faUserShield, label: 'Gerenciar Perfis', link: '#' }
      ]
    },
    {
      id: 'financeiro',
      title: 'Módulo Financeiro',
      items: [
        { icon: faDollarSign, label: 'Cadastrar Conta', link: '#' },
        { icon: faFileInvoice, label: 'Relatórios', link: '#' }
      ]
    },
    {
      id: 'condominio',
      title: 'Módulo Condomínio',
      items: [
        { icon: faBox, label: 'Registrar Encomenda', link: '#' },
        { icon: faUsers, label: 'Gerenciar Moradores', link: '#' }
      ]
    }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      {!sidebarOpen && (
        <button
          className="sidebar-toggle-btn sidebar-open-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
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

        <nav className="sidebar-nav">
          {modules.map((module) => (
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
                className={`module-items ${
                  expandedModules[module.id]
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
          ))}
        </nav>
      </div>
    </>
  );
}
