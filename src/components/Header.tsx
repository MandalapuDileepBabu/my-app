import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import BackButton from './BackButton';
import './Header.css';

const greenPrimary = '#29b430ff';
const greenDark = '#1b5e20';
const greenLight = '#43a047';
const textOnGreen = '#ffffff';

const headerStyles: React.CSSProperties = {
  background: `linear-gradient(135deg, ${greenPrimary}, ${greenDark})`,
  color: textOnGreen,
  padding: '14px 20px',
  borderBottom: `3px solid ${greenLight}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const brandStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: textOnGreen,
};

const logoStyles: React.CSSProperties = {
  width: '40px',
  height: '40px',
  objectFit: 'contain',
};

const titleStyles: React.CSSProperties = {
  margin: 0,
  fontSize: '1.25rem',
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: '0.2px',
};

const mottoStyles: React.CSSProperties = {
  margin: 0,
  fontSize: '0.85rem',
  opacity: 0.9,
  fontWeight: 500,
};

const navStyles: React.CSSProperties = {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

interface HeaderProps {
  loggedInUser: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedInUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const showBackButton = [
    '/news',
    '/news/water',
    '/news/roads',
    '/news/electricity',
    '/news/air',
    '/news/cleanliness',
    '/login',
  ].some((path) => location.pathname.startsWith(path));

  const navItems = loggedInUser ? [] : [
    { to: '/', label: 'Home' },
  ];

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <Link to="/" style={brandStyles}>
          <img src={logo} alt="Civic Review Portal Logo" style={logoStyles} />
          <div>
            <h1 style={titleStyles}>Civic Review Portal</h1>
            <p style={mottoStyles}>For a better, clean society for future generations</p>
          </div>
        </Link>

        {showBackButton && <BackButton />}

        <nav style={navStyles} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}

          {!loggedInUser && (
            <Link to="/news" className="nav-link">
              News
            </Link>
          )}

          {loggedInUser ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/feedback" className="nav-link">
                Feedback
              </Link>
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button
                onClick={handleLogoutClick}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #ffffff',
                  borderRadius: 8,
                  color: '#ffffff',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link nav-cta">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
