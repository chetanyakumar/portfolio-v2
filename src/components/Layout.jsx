import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data.js';
import pixelnestIcon from '../assets/logo.png';

export function PixelP({ size = 'default' }) {
  const cls = size === 'small' ? 'pixel-p-icon pixel-p-icon--sm' : 'pixel-p-icon';
  return (
    <img
      src={pixelnestIcon}
      alt="Pixelnest"
      className={cls}
      draggable="false"
    />
  );
}

export function Logo({ size = 'default' }) {
  return (
    <Link to="/" className={`nav-logo${size === 'small' ? ' nav-logo-sm' : ''}`}>
      <PixelP size={size} />
      <div className="nav-logo-textblock">
        <span className="nav-logo-text">PIXELNEST</span>
        {size !== 'small' && <span className="nav-logo-subtitle">WEB & DESIGN STUDIO</span>}
      </div>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const homeHash = (id) => (location.pathname === '/' ? `#${id}` : `/#${id}`);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <Logo />
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => {
          const id = l === 'Home' ? 'home' : l.toLowerCase();
          const hashId = l === 'Pricing' ? 'pricing' : id;
          return (
            <li key={l}>
              <a href={homeHash(hashId)} onClick={() => setMenuOpen(false)}>{l}</a>
            </li>
          );
        })}
        <li>
          <NavLink
            to="/free-source-code"
            className={({ isActive }) => (isActive ? 'nav-fsc-active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            Free Source Code
          </NavLink>
        </li>
      </ul>
      <a href={homeHash('contact')} className="nav-cta" onClick={() => setMenuOpen(false)}>
        Contact Us
      </a>
      <button type="button" className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <PixelP size="small" />
          <span>PIXELNEST</span>
        </div>
        <p className="footer-tagline">Designing Websites. Building Brands. Growing Businesses.</p>
      </div>
      <div className="footer-heart">❤️</div>
    </footer>
  );
}
