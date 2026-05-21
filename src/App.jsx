import { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import './styles.css';
import FreeSourceCodePage from './pages/FreeSourceCodePage.jsx';
import pixelnestIcon from './assets/logo.png';
import nestHero from './assets/pixelnest-full-logo.png';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import {
  ScrollingTrustBar,
  PricingSection,
  PortfolioSection,
  TestimonialsSection,
} from './components/HomeSections.jsx';
import {
  WHATSAPP, NAV_LINKS, SERVICE_PILLS, APPROACH_STEPS,
  FEATURES, TRUST_BAR, STATS,
} from './data.js';

/* ── Hooks ── */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (!opts.repeat) obs.unobserve(el); }
      else if (opts.repeat) setVisible(false);
    }, { threshold: opts.threshold || 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, duration = 2000, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

/* ── Pixel P Icon ── */
function PixelP({ size = 'default' }) {
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

/* ── Logo Component ── */
function Logo({ size = 'default' }) {
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

/* ── 1. Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const homeHash = (id) => (location.pathname === '/' ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <Logo />
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => {
          const id = l === 'Home' ? 'home' : l.toLowerCase();
          const hashId = l === 'Pricing' ? 'pricing' : id;
          return (
            <li key={l}><a href={homeHash(hashId)} onClick={() => setMenuOpen(false)}>{l}</a></li>
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
        <li className="nav-mobile-cta">
          <a href={homeHash('contact')} className="nav-cta nav-cta-mobile" onClick={() => setMenuOpen(false)}>Get in Touch</a>
        </li>
      </ul>
      <a href={homeHash('contact')} className="nav-cta nav-cta-desktop" onClick={() => setMenuOpen(false)}>Get in Touch</a>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

/* ── Background Particles ── */
function HeroParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── 3D Cinematic Logo Centerpiece ── */
function HeroOrb() {
  return (
    <div className="hero-brand-visual">
      <div className="hero-brand-ambient" />
      <div className="hero-brand-ambient-inner" />
      <div className="hero-brand-orb-wrap">
        <img
          src={pixelnestIcon}
          alt="PixelNest"
          className="hero-brand-icon"
          draggable="false"
        />
      </div>
      <span className="orb-spark orb-spark-1" />
      <span className="orb-spark orb-spark-2" />
      <span className="orb-spark orb-spark-3" />
      <span className="orb-spark orb-spark-4" />
      <span className="orb-spark orb-spark-5" />
      <span className="orb-spark orb-spark-6" />
      <span className="orb-spark orb-spark-7" />
    </div>
  );
}

/* ── 2. Hero Section ── */
function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background effects */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <HeroParticles />
      <div className="hero-glow" />

      {/* Left: 3D Orb Illustration */}
      <div className="hero-left">
        <HeroOrb />
      </div>

      {/* Right: Text Content */}
      <div className="hero-right">
        <span className="hero-eyebrow">✦ PixelNest Web & Design Studio</span>
        <h1 className="hero-headline">
          Crafting Digital<br />
          <span className="hero-headline-accent">Experiences</span>
        </h1>
        <p className="hero-subtitle">
          Elevate your brand with custom web design, development,
          and digital solutions that captivate and convert. We build
          premium websites that turn visitors into loyal customers.
        </p>
        <div className="hero-cta-group">
          <a href="#contact" className="hero-cta-filled">Get Started</a>
          <a href="#work" className="hero-cta-outlined">View Portfolio</a>
        </div>
      </div>

      {/* Bottom: Preview Cards */}
      <div className="hero-cards-wrapper">
        <div className="hero-cards">
          <div className="hero-card">
            <div className="hero-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Services</h3>
            <p>Custom web design, development & digital strategies built for growth.</p>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Portfolio</h3>
            <p>Explore premium projects showcasing innovative, results-driven designs.</p>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
            <h3>Design Studio</h3>
            <p>Where creativity meets precision — pixel-perfect craftsmanship guaranteed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Service Pills Bar ── */
function PillsBar() {
  return (
    <div className="pills-bar">
      {SERVICE_PILLS.map(p => <div className="pill" key={p}>{p}</div>)}
    </div>
  );
}

/* ── Stats Bar ── */
function StatItem({ target, suffix, label, active }) {
  const val = useCounter(target, 2000, active);
  return (
    <div className="stat-item">
      <div className="stat-num">{val}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function StatsBar() {
  const [ref, vis] = useInView();
  return (
    <div className={`stats-bar section-hidden${vis ? ' section-visible' : ''}`} ref={ref}>
      {STATS.map((s, i) => (
        <StatItem key={i} target={s.target} suffix={s.suffix} label={s.label} active={vis} />
      ))}
    </div>
  );
}

/* ── 3. Before vs After ── */
function BeforeAfter() {
  const [ref, vis] = useInView();
  return (
    <div className={`ba-section section-hidden${vis ? ' section-visible' : ''}`} ref={ref} id="about">
      <div style={{ textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <h2>Before vs <span className="accent">After</span></h2>
        <p className="section-sub" style={{ margin: '0 auto 56px' }}>A better design. A stronger brand. More business.</p>
        <div className="ba-wrap">
          <div className="ba-card before">
            <h3>❌ BEFORE</h3>
            <BeforeMockup />
            <p>Outdated layout, slow loading, not mobile-friendly, zero conversions.</p>
          </div>
          <div className="ba-arrow">→</div>
          <div className="ba-card after">
            <h3>✅ AFTER</h3>
            <AfterMockup />
            <p>Modern design, blazing fast, fully responsive, SEO optimized. Visitors become customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ width: '100%', borderRadius: 10, marginBottom: 14 }} fill="none">
      <rect width="320" height="200" rx="8" fill="#1a1a28"/>
      <rect x="0" y="0" width="320" height="32" fill="#151520"/>
      <circle cx="16" cy="16" r="5" fill="#EF4444" opacity=".6"/>
      <circle cx="30" cy="16" r="5" fill="#F59E0B" opacity=".6"/>
      <circle cx="44" cy="16" r="5" fill="#22C55E" opacity=".6"/>
      <rect x="16" y="44" width="180" height="10" rx="3" fill="#2a2a3a"/>
      <rect x="16" y="62" width="140" height="6" rx="3" fill="#222230"/>
      <rect x="16" y="74" width="160" height="6" rx="3" fill="#222230"/>
      <rect x="16" y="92" width="70" height="20" rx="4" fill="#2a2a3a"/>
      <rect x="96" y="92" width="70" height="20" rx="4" fill="#2a2a3a"/>
      <rect x="16" y="124" width="90" height="60" rx="4" fill="#222230"/>
      <rect x="116" y="124" width="90" height="60" rx="4" fill="#222230"/>
      <rect x="216" y="124" width="90" height="60" rx="4" fill="#222230"/>
    </svg>
  );
}

function AfterMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ width: '100%', borderRadius: 10, marginBottom: 14 }} fill="none">
      <rect width="320" height="200" rx="8" fill="#0A0A0F"/>
      <rect x="0" y="0" width="320" height="28" fill="#0e0e18"/>
      <rect x="14" y="9" width="40" height="10" rx="3" fill="#7C3AED"/>
      <rect x="220" y="9" width="30" height="10" rx="3" fill="#1a1a2e"/>
      <rect x="256" y="9" width="30" height="10" rx="3" fill="#1a1a2e"/>
      <rect x="14" y="42" width="160" height="10" rx="4" fill="#fff" opacity=".9"/>
      <rect x="14" y="60" width="120" height="6" rx="3" fill="#94A3B8" opacity=".5"/>
      <rect x="14" y="72" width="140" height="6" rx="3" fill="#94A3B8" opacity=".3"/>
      <rect x="14" y="90" width="80" height="22" rx="11" fill="#7C3AED"/>
      <rect x="14" y="128" width="90" height="56" rx="8" fill="#0e0e18" stroke="rgba(168,85,247,.2)" strokeWidth="1"/>
      <rect x="112" y="128" width="90" height="56" rx="8" fill="#0e0e18" stroke="rgba(168,85,247,.2)" strokeWidth="1"/>
      <rect x="210" y="128" width="90" height="56" rx="8" fill="#0e0e18" stroke="rgba(168,85,247,.2)" strokeWidth="1"/>
    </svg>
  );
}

/* ── 4. Our Approach ── */
function ApproachSection() {
  const [ref, vis] = useInView();
  return (
    <section className={`section section-hidden${vis ? ' section-visible' : ''}`} ref={ref} id="services">
      <h2>Our <span className="accent">Approach</span></h2>
      <p className="section-sub">We follow a simple process to deliver websites that actually work.</p>
      <div className="approach-wrap">
        <div className="approach-cards">
          {APPROACH_STEPS.map(s => (
            <div className="approach-card" key={s.num}>
              <span className="approach-icon">{s.icon}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="timeline-track">
          {APPROACH_STEPS.map((s, i) => (
            <div key={s.num} style={{ display: 'contents' }}>
              <div className="tl-num">{s.num}</div>
              {i < APPROACH_STEPS.length - 1 && <div className="tl-spacer" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. What You Get ── */
function FeaturesSection() {
  const [ref, vis] = useInView();
  return (
    <section className={`section section-center section-hidden${vis ? ' section-visible' : ''}`} ref={ref} id="benefits">
      <h2>What <span className="accent">You Get</span></h2>
      <p className="section-sub">Websites designed to create impact and drive real results.</p>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="gradient-banner">
        <p>Our goal is simple: To help your business stand out online and grow with a website you're proud of.</p>
      </div>
    </section>
  );
}

/* ── 6. CTA Section ── */
function CTASection() {
  const [ref, vis] = useInView();
  const dots = Array.from({ length: 96 });
  return (
    <div className={`cta-section section-hidden${vis ? ' section-visible' : ''}`} ref={ref}>
      <div className="cta-inner">
        <div className="cta-left">
          <h2>Let's Build Something <span className="accent">Amazing.</span></h2>
          <p>Your business deserves a website that works as hard as you do.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Let's Work Together →
          </a>
        </div>
        <div className="cta-dots">
          <div className="dot-grid">
            {dots.map((_, i) => <span key={i} />)}
          </div>
        </div>
      </div>
      <div className="trust-bottom">
        {TRUST_BAR.map((t, i) => (
          <div className="trust-item" key={i}>
            <span className="trust-icon">{t.icon}</span>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Free Source Code Promo ── */
function FreeSourceCodePromo() {
  const [ref, vis] = useInView({ threshold: 0.08 });
  return (
    <section className={`fsc-promo section-hidden${vis ? ' section-visible' : ''}`} ref={ref} id="free-source-codes">
      <div className="fsc-glow" />
      <div className="fsc-promo-inner">
        <h2>Free Source <span className="accent">Code</span></h2>
        <p className="fsc-sub">Browse free templates with live previews, tech stacks, and instant downloads — built by PIXELNEST.</p>
        <Link to="/free-source-code" className="btn-primary">Browse Free Source Code →</Link>
      </div>
    </section>
  );
}

/* ── Toast System ── */
function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}${t.removing ? ' removing' : ''}`}
          onAnimationEnd={() => { if (t.removing) onRemove(t.id); }}>
          <span>{t.type === 'success' ? '✅' : '❌'}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, removing: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t));
    }, 3000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, addToast, removeToast };
}

/* ── Validation Helpers ── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid email address';
  if (!form.service) errors.service = 'Please select a service';
  if (!form.message.trim()) errors.message = 'Message is required';
  return errors;
}

/* ── Instagram SVG Icon ── */
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="#7C3AED" />
    </svg>
  );
}

/* ── 7. Contact Section ── */
const CONTACT_SERVICES = ['Business Website', 'Landing Page', 'E-commerce Site', 'UI/UX Design', 'Other'];
const INITIAL_CONTACT = { name: '', email: '', service: '', message: '' };

function ContactSection() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState(INITIAL_CONTACT);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const update = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Please fill in all required fields correctly', 'error');
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        'service_t1ywhzs',
        'template_zy2y3z6',
        {
          name: form.name,
          email: form.email,
          business: form.service,
          message: form.message,
        },
        { publicKey: 'dus41Z0X1pLFInRZV' }
      );
      addToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      setForm(INITIAL_CONTACT);
    } catch (err) {
      console.error('EmailJS Error:', err);
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fc = (key) => errors[key] ? 'ct-field-error' : '';

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <section className={`ct-section section-hidden${vis ? ' section-visible' : ''}`} ref={ref} id="contact">
        <div className="ct-glow" />
        <div className="ct-header">
          <h2>Get In <span className="accent">Touch</span></h2>
          <p className="ct-sub">Have a project in mind? Let's talk about it.</p>
        </div>

        <form className="ct-card" onSubmit={handleSubmit} noValidate>
          <div className="ct-field">
            <input
              type="text" placeholder="Your Full Name"
              value={form.name} onChange={update('name')}
              className={fc('name')}
            />
            {errors.name && <span className="ct-error">{errors.name}</span>}
          </div>
          <div className="ct-field">
            <input
              type="email" placeholder="your@email.com"
              value={form.email} onChange={update('email')}
              className={fc('email')}
            />
            {errors.email && <span className="ct-error">{errors.email}</span>}
          </div>
          <div className="ct-field">
            <select value={form.service} onChange={update('service')} className={fc('service')}>
              <option value="" disabled>Service Interested In</option>
              {CONTACT_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service && <span className="ct-error">{errors.service}</span>}
          </div>
          <div className="ct-field">
            <textarea
              rows="5" placeholder="Tell us about your project..."
              value={form.message} onChange={update('message')}
              className={fc('message')}
            />
            {errors.message && <span className="ct-error">{errors.message}</span>}
          </div>
          <button type="submit" className={`ct-submit${loading ? ' ct-loading' : ''}`} disabled={loading}>
            {loading ? (<><span className="spinner" /> Sending...</>) : 'Send Message →'}
          </button>
        </form>

        <div className="ct-meta">
          <p>We respond within 2-4 hours ⚡</p>
          <p>Based in Mathura, Working Worldwide 🌍</p>
          <p className="ct-wa-alt">
            Prefer WhatsApp?{' '}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              Click here to chat directly →
            </a>
          </p>
        </div>

        <div className="ct-pills">

          {/* Instagram pill */}
          <a
            href="https://www.instagram.com/pixelnest.11/"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-pill ct-pill-link"
            style={{ animationDelay: '0.12s' }}
          >
            <span className="ct-pill-icon"><InstagramIcon /></span>
            <span>pixelnest.11</span>
          </a>
        </div>
      </section>
    </>
  );
}

/* ── 8. Footer ── */
function Footer() {
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

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PillsBar />
      <ScrollingTrustBar />
      <StatsBar />
      <BeforeAfter />
      <ApproachSection />
      <PricingSection />
      <FeaturesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <FreeSourceCodePromo />
      <ContactSection />
      <Footer />
    </>
  );
}
/* ── Page Loader ── */
function PageLoader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => onComplete(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);
  return (
    <div className={`page-loader${fadeOut ? ' page-loader--fade' : ''}`}>
      <div className="loader-ambient" />
      <div className="loader-ring-outer" />
      <div className="loader-ring" />
      <img src={pixelnestIcon} alt="Loading" className="loader-icon" draggable="false" />
      <span className="loader-particle loader-p1" />
      <span className="loader-particle loader-p2" />
      <span className="loader-particle loader-p3" />
      <span className="loader-particle loader-p4" />
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useRef(() => setLoading(false));
  if (loading) return <PageLoader onComplete={done.current} />;
  return (
    <BrowserRouter>
      <ScrollToHash />
      <WhatsAppFloat />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/free-source-code" element={<FreeSourceCodePage />} />
      </Routes>
    </BrowserRouter>
  );
}
