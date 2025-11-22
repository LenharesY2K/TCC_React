import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faBell,
  faEnvelope,
  faUser,
  faChevronDown,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(2);

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

          <div className="divider"></div>

          <div 
            className="profile-section"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-info">
              <span className="profile-name">Nicolas</span>
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
                <a href="#logout" className="dropdown-item logout">
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