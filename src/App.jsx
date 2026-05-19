import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import './styles.css';
import FreeSourceCodePage from './pages/FreeSourceCodePage.jsx';
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
function PixelP({ size = 36 }) {
  const px = Math.round(size / 9);
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixel-p-icon">
      <rect width="36" height="36" rx="8" fill="#7C3AED"/>
      <rect x="8" y="6" width={px*2} height={px*6} rx="1" fill="#fff"/>
      <rect x="16" y="6" width={px*3} height={px*2} rx="1" fill="#fff"/>
      <rect x="22" y="10" width={px*2} height={px*2} rx="1" fill="#fff"/>
      <rect x="16" y="14" width={px*3} height={px*2} rx="1" fill="#fff"/>
    </svg>
  );
}

/* ── Logo Component ── */
function Logo({ size = 'default' }) {
  const s = size === 'small' ? 28 : 36;
  return (
    <Link to="/" className={`nav-logo${size === 'small' ? ' nav-logo-sm' : ''}`}>
      <PixelP size={s} />
      <span className="nav-logo-text">PIXELNEST</span>
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
      </ul>
      <a href={homeHash('contact')} className="nav-cta" onClick={() => setMenuOpen(false)}>Contact Us</a>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

/* ── 2. Hero ── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-left">
        <h1>We Design Websites That Build <span className="accent">Businesses.</span></h1>
        <p className="hero-subtitle">Modern. Strategic. <span className="accent">Results-Driven.</span></p>
        <div className="hero-divider" />
        <p className="hero-body">
          At PIXELNEST, we create high-performing websites that help brands look professional,
          build trust, and convert visitors into customers.
        </p>
        <div className="hero-scroll" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          Swipe to see how we do it <span className="arrow">↓</span>
        </div>
      </div>
      <div className="hero-right">
        <HeroMockup />
      </div>
    </section>
  );
}

/* Hero Mockup — SVG laptop + phone */
function HeroMockup() {
  return (
    <svg viewBox="0 0 520 380" className="hero-mockup" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Laptop */}
      <rect x="40" y="30" width="340" height="220" rx="12" fill="#111" stroke="#1E1E2E" strokeWidth="2"/>
      <rect x="55" y="45" width="310" height="190" rx="4" fill="#0A0A0A"/>
      {/* Screen content */}
      <rect x="70" y="60" width="60" height="8" rx="4" fill="#7C3AED"/>
      <rect x="70" y="78" width="200" height="6" rx="3" fill="#fff" opacity=".8"/>
      <rect x="70" y="92" width="160" height="4" rx="2" fill="#94A3B8" opacity=".5"/>
      <rect x="70" y="104" width="180" height="4" rx="2" fill="#94A3B8" opacity=".3"/>
      <rect x="70" y="124" width="80" height="24" rx="12" fill="#7C3AED"/>
      <rect x="160" y="124" width="70" height="24" rx="12" fill="none" stroke="#7C3AED" strokeWidth="1" opacity=".5"/>
      <rect x="70" y="168" width="90" height="50" rx="6" fill="#1E1E2E"/>
      <rect x="170" y="168" width="90" height="50" rx="6" fill="#1E1E2E"/>
      <rect x="270" y="168" width="90" height="50" rx="6" fill="#1E1E2E"/>
      {/* Laptop base */}
      <path d="M20 250 L40 250 L40 248 C40 246 42 244 44 244 L376 244 C378 244 380 246 380 248 L380 250 L400 250 C400 260 390 268 380 268 L40 268 C30 268 20 260 20 250Z" fill="#111" stroke="#1E1E2E" strokeWidth="1.5"/>
      {/* Phone */}
      <rect x="400" y="100" width="100" height="180" rx="14" fill="#111" stroke="#1E1E2E" strokeWidth="2"/>
      <rect x="410" y="115" width="80" height="150" rx="4" fill="#0A0A0A"/>
      {/* Phone content */}
      <rect x="420" y="128" width="40" height="5" rx="2.5" fill="#7C3AED"/>
      <rect x="420" y="140" width="60" height="4" rx="2" fill="#fff" opacity=".7"/>
      <rect x="420" y="150" width="50" height="3" rx="1.5" fill="#94A3B8" opacity=".4"/>
      <rect x="420" y="166" width="50" height="16" rx="8" fill="#7C3AED"/>
      <rect x="420" y="194" width="26" height="26" rx="4" fill="#1E1E2E"/>
      <rect x="452" y="194" width="26" height="26" rx="4" fill="#1E1E2E"/>
      <rect x="420" y="226" width="26" height="26" rx="4" fill="#1E1E2E"/>
      <rect x="452" y="226" width="26" height="26" rx="4" fill="#1E1E2E"/>
      {/* Phone notch */}
      <rect x="435" y="106" width="30" height="5" rx="2.5" fill="#1E1E2E"/>
      {/* Glow */}
      <circle cx="260" cy="190" r="160" fill="url(#glow)" opacity=".15"/>
      <defs>
        <radialGradient id="glow"><stop stopColor="#7C3AED"/><stop offset="1" stopColor="transparent"/></radialGradient>
      </defs>
    </svg>
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
      <rect width="320" height="200" rx="8" fill="#F1F5F9"/>
      <rect x="0" y="0" width="320" height="32" fill="#E2E8F0"/>
      <circle cx="16" cy="16" r="5" fill="#EF4444" opacity=".6"/>
      <circle cx="30" cy="16" r="5" fill="#F59E0B" opacity=".6"/>
      <circle cx="44" cy="16" r="5" fill="#22C55E" opacity=".6"/>
      <rect x="16" y="44" width="180" height="10" rx="3" fill="#CBD5E1"/>
      <rect x="16" y="62" width="140" height="6" rx="3" fill="#E2E8F0"/>
      <rect x="16" y="74" width="160" height="6" rx="3" fill="#E2E8F0"/>
      <rect x="16" y="92" width="70" height="20" rx="4" fill="#CBD5E1"/>
      <rect x="96" y="92" width="70" height="20" rx="4" fill="#CBD5E1"/>
      <rect x="16" y="124" width="90" height="60" rx="4" fill="#E2E8F0"/>
      <rect x="116" y="124" width="90" height="60" rx="4" fill="#E2E8F0"/>
      <rect x="216" y="124" width="90" height="60" rx="4" fill="#E2E8F0"/>
    </svg>
  );
}

function AfterMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ width: '100%', borderRadius: 10, marginBottom: 14 }} fill="none">
      <rect width="320" height="200" rx="8" fill="#0A0A0A"/>
      <rect x="0" y="0" width="320" height="28" fill="#111"/>
      <rect x="14" y="9" width="40" height="10" rx="3" fill="#7C3AED"/>
      <rect x="220" y="9" width="30" height="10" rx="3" fill="#1E1E2E"/>
      <rect x="256" y="9" width="30" height="10" rx="3" fill="#1E1E2E"/>
      <rect x="14" y="42" width="160" height="10" rx="4" fill="#fff" opacity=".9"/>
      <rect x="14" y="60" width="120" height="6" rx="3" fill="#94A3B8" opacity=".5"/>
      <rect x="14" y="72" width="140" height="6" rx="3" fill="#94A3B8" opacity=".3"/>
      <rect x="14" y="90" width="80" height="22" rx="11" fill="#7C3AED"/>
      <rect x="14" y="128" width="90" height="56" rx="8" fill="#111" stroke="#1E1E2E" strokeWidth="1"/>
      <rect x="112" y="128" width="90" height="56" rx="8" fill="#111" stroke="#1E1E2E" strokeWidth="1"/>
      <rect x="210" y="128" width="90" height="56" rx="8" fill="#111" stroke="#1E1E2E" strokeWidth="1"/>
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
          <PixelP size={28} />
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

/* ── Main App ── */
export default function App() {
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
