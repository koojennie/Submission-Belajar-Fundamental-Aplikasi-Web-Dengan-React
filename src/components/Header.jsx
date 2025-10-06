import React from 'react';
import { Link } from 'react-router-dom';
import { MdGTranslate } from 'react-icons/md';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

export default function Header({ authedUser, onLogout }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <header>
      <h1><Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
      <nav className="navigation">
        <ul>
          {authedUser && (
            <li>
              <Link to="/archives">
                {locale === 'id' ? 'Terarsip' : 'Archived'}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <button className="toggle-locale" onClick={toggleLocale} title="Toggle language">
        <MdGTranslate />
      </button>

      <button className="toggle-theme" onClick={toggleTheme} title="Toggle theme">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      {authedUser && (
        <button className="button-logout" onClick={onLogout} title="Logout">
          <FiLogOut /> {authedUser.name}
        </button>
      )}
    </header>
  );
}