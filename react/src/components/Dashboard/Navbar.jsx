import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

import {
  faSearch,
  faBell,
  faEnvelope,
  faUser,
  faChevronDown,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ user }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications] = useState(99);
  const [messages] = useState(99);

  const displayName =
    user?.name || user?.username || "Usuário";

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }
  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <div className="topbar">
        <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Pesquisar..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <div className="navbar-actions">
          <div className="icon-btn">
            <FontAwesomeIcon icon={faBell} className="action-icon" />
            {notifications > 0 && (
              <span className="badge-notification">{notifications}</span>
            )}
          </div>

          <div className="icon-btn">
            <FontAwesomeIcon icon={faEnvelope} className="action-icon" />
            {messages > 0 && (
              <span className="badge-notification">{messages}</span>
            )}
          </div>


          <div
            className="profile-section"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-info">
              <span className="profile-name">{displayName}</span>
              <span className="profile-role">Admin</span>
            </div>
            <div className="profile-pic">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevron ${showProfileMenu ? 'rotated' : ''}`}
            />

            {showProfileMenu && (
              <div className="profile-dropdown">
                <a href="#profile" className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Meu Perfil</span>
                </a>
                <a href="#settings" className="dropdown-item">
                  <FontAwesomeIcon icon={faCog} />
                  <span>Configurações</span>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="#"
                  className="dropdown-item logout"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Sair</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}