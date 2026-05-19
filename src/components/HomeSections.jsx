import { useRef, useEffect, useState } from 'react';
import {
  WHATSAPP,
  SCROLL_TRUST_ITEMS,
  PRICING_PLANS,
  PORTFOLIO_PROJECTS,
  TESTIMONIALS,
} from '../data.js';

export function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        if (!opts.repeat) obs.unobserve(el);
      } else if (opts.repeat) setVisible(false);
    }, { threshold: opts.threshold || 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts.repeat, opts.threshold]);
  return [ref, visible];
}

export function ScrollingTrustBar() {
  const items = [...SCROLL_TRUST_ITEMS, ...SCROLL_TRUST_ITEMS];
  return (
    <div className="scroll-trust" aria-label="Trust indicators">
      <div className="scroll-trust-track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="scroll-trust-item">
            {item}
            <span className="scroll-trust-dot" aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  const [ref, vis] = useInView();
  return (
    <section
      className={`section section-alt section-center section-hidden${vis ? ' section-visible' : ''}`}
      ref={ref}
      id="pricing"
    >
      <h2>Simple, Transparent <span className="accent">Pricing</span></h2>
      <p className="section-sub">Professional websites for every business size — no hidden fees.</p>
      <div className="pricing-grid">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card${plan.popular ? ' pricing-card-popular' : ''}`}
          >
            {plan.popular && <span className="pricing-badge">POPULAR</span>}
            <h3>{plan.name}</h3>
            <div className="pricing-price">{plan.price}</div>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <span className="pricing-check" aria-hidden>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="pricing-cta">
              Get Started →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PortfolioThumb({ theme }) {
  const presets = {
    hotel: { bg: '#0e0e1a', accent: '#7c3aed' },
    gym: { bg: '#0a0a12', accent: '#9d5fff' },
    ecommerce: { bg: '#0d0a14', accent: '#7c3aed' },
    restaurant: { bg: '#120e0a', accent: '#9d5fff' },
  };
  const c = presets[theme] || presets.hotel;
  return (
    <svg viewBox="0 0 400 220" className="portfolio-thumb-svg" aria-hidden>
      <rect width="400" height="220" fill={c.bg} />
      <rect x="24" y="20" width="48" height="10" rx="5" fill={c.accent} />
      <rect x="24" y="44" width="200" height="12" rx="6" fill="#f0eeff" opacity=".85" />
      <rect x="24" y="64" width="140" height="6" rx="3" fill="#8b8aaa" opacity=".5" />
      <rect x="24" y="88" width="90" height="28" rx="14" fill={c.accent} opacity=".85" />
      <rect x="24" y="130" width="100" height="60" rx="8" fill="#111" stroke="rgba(120,80,255,.2)" />
      <rect x="136" y="130" width="100" height="60" rx="8" fill="#111" stroke="rgba(120,80,255,.2)" />
      <rect x="248" y="130" width="100" height="60" rx="8" fill="#111" stroke="rgba(120,80,255,.2)" />
      <circle cx="340" cy="50" r="40" fill={c.accent} opacity=".12" />
    </svg>
  );
}

function PortfolioCardBody({ project }) {
  return (
    <div className="portfolio-body">
      <span className="portfolio-tag">{project.tag}</span>
      <h3>{project.name}</h3>
      <p className="portfolio-industry">{project.industry}</p>
      <div className="portfolio-actions">
        <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="portfolio-btn portfolio-btn-primary">Live Preview</a>
        <a href="#contact" className="portfolio-btn portfolio-btn-ghost">View Details</a>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [ref, vis] = useInView();
  return (
    <section
      className={`section section-center section-hidden${vis ? ' section-visible' : ''}`}
      ref={ref}
      id="work"
    >
      <h2>Our <span className="accent">Work</span></h2>
      <p className="section-sub">Recent projects built for businesses across India.</p>
      <div className="portfolio-grid">
        {PORTFOLIO_PROJECTS.map((p) => (
          <article key={p.id} className="portfolio-card">
            <div className="portfolio-thumb">
              <PortfolioThumb theme={p.theme} />
            </div>
            <PortfolioCardBody project={p} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [ref, vis] = useInView();
  return (
    <section
      className={`section section-alt section-center section-hidden${vis ? ' section-visible' : ''}`}
      ref={ref}
      id="testimonials"
    >
      <h2>What Our <span className="accent">Clients Say</span></h2>
      <p className="section-sub">Trusted by businesses in Mathura and across India.</p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <article key={t.name} className="testimonial-card">
            <span className="testimonial-quote" aria-hidden>&ldquo;</span>
            <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.init}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.business} · {t.city}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
