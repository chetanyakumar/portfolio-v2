import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data.js';

export function PixelP({ size = 36 }) {
  const px = Math.round(size / 9);
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixel-p-icon">
      <rect width="36" height="36" rx="8" fill="#7C3AED" />
      <rect x="8" y="6" width={px * 2} height={px * 6} rx="1" fill="#fff" />
      <rect x="16" y="6" width={px * 3} height={px * 2} rx="1" fill="#fff" />
      <rect x="22" y="10" width={px * 2} height={px * 2} rx="1" fill="#fff" />
      <rect x="16" y="14" width={px * 3} height={px * 2} rx="1" fill="#fff" />
    </svg>
  );
}

export function Logo({ size = 'default' }) {
  const s = size === 'small' ? 28 : 36;
  return (
    <Link to="/" className={`nav-logo${size === 'small' ? ' nav-logo-sm' : ''}`}>
      <PixelP size={s} />
      <span className="nav-logo-text">PIXELNEST</span>
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
          <PixelP size={28} />
          <span>PIXELNEST</span>
        </div>
        <p className="footer-tagline">Designing Websites. Building Brands. Growing Businesses.</p>
      </div>
      <div className="footer-heart">❤️</div>
    </footer>
  );
}
