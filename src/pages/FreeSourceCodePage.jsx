import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout.jsx';
import { ToastContainer } from '../components/Toast.jsx';
import { useInView, useToast } from '../hooks.js';
import {
  SOURCE_PROJECTS,
  SOURCE_DIFFICULTIES,
  SOURCE_TECH_FILTERS,
  LEAD_STORAGE_KEY,
  REVIEW_STORAGE_KEY,
} from '../data.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CardPreview({ theme }) {
  const themes = {
    romantic: (
      <>
        <rect width="100%" height="100%" fill="url(#rom-bg)" />
        <rect x="20%" y="28%" width="60%" height="8" rx="4" fill="#fff" opacity=".85" />
        <rect x="25%" y="42%" width="50%" height="5" rx="2.5" fill="#94A3B8" opacity=".4" />
        <rect x="32%" y="58%" width="36%" height="18" rx="9" fill="#7C3AED" />
        <circle cx="75%" cy="22%" r="18" fill="#7C3AED" opacity=".2" />
      </>
    ),
    agency: (
      <>
        <rect width="100%" height="100%" fill="#0A0A0A" />
        <rect x="8%" y="10%" width="22%" height="6" rx="3" fill="#7C3AED" />
        <rect x="8%" y="28%" width="55%" height="8" rx="4" fill="#fff" opacity=".9" />
        <rect x="8%" y="42%" width="40%" height="5" rx="2.5" fill="#94A3B8" opacity=".4" />
        <rect x="8%" y="58%" width="28%" height="14" rx="7" fill="#7C3AED" />
        <rect x="8%" y="78%" width="26%" height="14" rx="4" fill="#111" stroke="#1E1E2E" />
        <rect x="38%" y="78%" width="26%" height="14" rx="4" fill="#111" stroke="#1E1E2E" />
        <rect x="68%" y="78%" width="26%" height="14" rx="4" fill="#111" stroke="#1E1E2E" />
      </>
    ),
    portfolio: (
      <>
        <rect width="100%" height="100%" fill="#0A0A0A" />
        <rect x="8%" y="12%" width="35%" height="7" rx="3.5" fill="#fff" opacity=".9" />
        <rect x="8%" y="24%" width="50%" height="4" rx="2" fill="#94A3B8" opacity=".35" />
        <rect x="8%" y="40%" width="40%" height="22" rx="6" fill="#111" stroke="#1E1E2E" />
        <rect x="52%" y="40%" width="40%" height="22" rx="6" fill="#111" stroke="#1E1E2E" />
        <rect x="8%" y="68%" width="84%" height="22" rx="6" fill="#111" stroke="#1E1E2E" />
      </>
    ),
    dashboard: (
      <>
        <rect width="100%" height="100%" fill="#0A0A0A" />
        <rect x="0" y="0" width="22%" height="100%" fill="#111" />
        <rect x="28%" y="10%" width="18%" height="18" rx="4" fill="#111" stroke="#1E1E2E" />
        <rect x="50%" y="10%" width="18%" height="18" rx="4" fill="#111" stroke="#1E1E2E" />
        <rect x="72%" y="10%" width="22%" height="18" rx="4" fill="#7C3AED" opacity=".3" />
        <rect x="28%" y="36%" width="66%" height="50" rx="6" fill="#111" stroke="#1E1E2E" />
      </>
    ),
    restaurant: (
      <>
        <rect width="100%" height="100%" fill="#1a0f0a" />
        <rect x="8%" y="15%" width="50%" height="8" rx="4" fill="#fff" opacity=".85" />
        <rect x="8%" y="30%" width="35%" height="5" rx="2.5" fill="#94A3B8" opacity=".4" />
        <rect x="8%" y="48%" width="84%" height="3" rx="1.5" fill="#7C3AED" opacity=".5" />
        <rect x="8%" y="56%" width="70%" height="4" rx="2" fill="#94A3B8" opacity=".3" />
        <rect x="8%" y="66%" width="60%" height="4" rx="2" fill="#94A3B8" opacity=".3" />
      </>
    ),
    startup: (
      <>
        <rect width="100%" height="100%" fill="#0A0A0A" />
        <rect x="10%" y="12%" width="80%" height="10" rx="5" fill="#fff" opacity=".9" />
        <rect x="20%" y="28%" width="60%" height="5" rx="2.5" fill="#94A3B8" opacity=".4" />
        <rect x="30%" y="42%" width="40%" height="16" rx="8" fill="#7C3AED" />
        <rect x="12%" y="68%" width="24%" height="22" rx="6" fill="#111" stroke="#1E1E2E" />
        <rect x="38%" y="68%" width="24%" height="22" rx="6" fill="#111" stroke="#7C3AED" strokeWidth="1" />
        <rect x="64%" y="68%" width="24%" height="22" rx="6" fill="#111" stroke="#1E1E2E" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 400 220" className="fsc-card-preview-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rom-bg" x1="0" y1="0" x2="400" y2="220">
          <stop offset="0%" stopColor="#1a0033" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
      </defs>
      {themes[theme] || themes.agency}
    </svg>
  );
}

function SourceCard({ project, onDownload, onPreview }) {
  const diffClass = `fsc-diff fsc-diff-${project.difficulty.toLowerCase()}`;
  return (
    <article className="fsc-card">
      <div className="fsc-card-preview">
        <CardPreview theme={project.previewTheme} />
        {project.isNew && <span className="fsc-card-badge">New</span>}
        <span className={diffClass}>{project.difficulty}</span>
      </div>
      <div className="fsc-card-body">
        <span className="fsc-card-tag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="fsc-tech-stack">
          {project.techStack.map((t) => (
            <span key={t} className="fsc-tech-pill">{t}</span>
          ))}
        </div>
        <div className="fsc-card-actions">
          <button type="button" className="fsc-btn-preview" onClick={() => onPreview(project)}>
            <span>👁</span> Preview
          </button>
          <button type="button" className="fsc-btn-download" onClick={() => onDownload(project)}>
            <span>⬇</span> Download
          </button>
        </div>
      </div>
    </article>
  );
}


function saveReview({ project, rating, comment }) {
  try {
    const raw = localStorage.getItem(REVIEW_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push({
      projectId: project.id,
      projectTitle: project.title,
      rating: rating || 0,
      comment: comment.trim(),
      at: Date.now(),
    });
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(list.slice(-50)));
  } catch {
    /* ignore storage errors */
  }
}

async function sendReviewEmail({ project, rating, comment, lead }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return;

  const emailjs = (await import('@emailjs/browser')).default;
  await emailjs.send(
    serviceId,
    templateId,
    {
      name: lead?.name || 'Anonymous',
      email: lead?.email || 'noreply@pixelnest.local',
      business: 'Free Source Code Review',
      message: `Review for "${project.title}" (${project.id}): ${rating}★${comment ? ` — ${comment}` : ''}`,
    },
    { publicKey },
  );
}

function getLeadInfo() {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function ReviewModal({ project, onSkip, onComplete }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [phase, setPhase] = useState('form');
  const [loading, setLoading] = useState(false);
  const display = hover || rating;

  const handleSkip = () => onSkip(project);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { project, rating, comment };
    saveReview(payload);
    try {
      await sendReviewEmail({ ...payload, lead: getLeadInfo() });
    } catch (err) {
      console.error(err);
    }
    setPhase('success');
    setLoading(false);
    setTimeout(() => onComplete(project), 1400);
  };

  return (
    <div className="fsc-modal-backdrop fsc-review-backdrop" onClick={handleSkip} role="presentation">
      <div
        className="fsc-modal fsc-review-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="review-modal-title"
      >
        <button type="button" className="fsc-modal-close" onClick={handleSkip} aria-label="Close">×</button>
        {phase === 'success' ? (
          <div className="fsc-review-success">
            <span className="fsc-review-success-icon" aria-hidden>✓</span>
            <h3>Thank you!</h3>
            <p>Your review was saved. Starting your download…</p>
          </div>
        ) : (
          <>
            <p className="fsc-review-eyebrow">Optional · helps us improve</p>
            <h3 id="review-modal-title">Quick review before download</h3>
            <p className="fsc-modal-sub">
              How was <strong>{project.title}</strong>? Rate it if you&apos;d like — then grab your files.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="fsc-review-stars" role="group" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`fsc-star${display >= n ? ' active' : ''}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    aria-pressed={rating === n}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="fsc-modal-field">
                <textarea
                  rows="3"
                  placeholder="Short feedback (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={400}
                />
              </div>
              <div className="fsc-review-actions">
                <button
                  type="submit"
                  className={`fsc-review-btn-primary${loading ? ' loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Saving…' : 'Leave Review & Download'}
                </button>
                <button type="button" className="fsc-review-btn-skip" onClick={handleSkip}>
                  Skip & Download
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function LeadModal({ project, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) next.email = 'Enter a valid email';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const emailjs = (await import('@emailjs/browser')).default;
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: form.name,
            email: form.email,
            business: 'Free Source Code Download',
            message: `Download request: ${project.title} (${project.id})`,
          },
          { publicKey },
        );
      }

      localStorage.setItem(
        LEAD_STORAGE_KEY,
        JSON.stringify({ name: form.name, email: form.email, at: Date.now() }),
      );
      onSuccess(project);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fsc-modal-backdrop" onClick={onClose} role="presentation">
      <div className="fsc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="lead-modal-title">
        <button type="button" className="fsc-modal-close" onClick={onClose} aria-label="Close">×</button>
        <h3 id="lead-modal-title">Get Your Free Source Code</h3>
        <p className="fsc-modal-sub">
          Enter your details to download <strong>{project.title}</strong>. We&apos;ll send updates on new free projects.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="fsc-modal-field">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
              className={errors.name ? 'fsc-input-error' : ''}
            />
            {errors.name && <span className="fsc-field-error">{errors.name}</span>}
          </div>
          <div className="fsc-modal-field">
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
              className={errors.email ? 'fsc-input-error' : ''}
            />
            {errors.email && <span className="fsc-field-error">{errors.email}</span>}
          </div>
          {errors.form && <span className="fsc-field-error">{errors.form}</span>}
          <button type="submit" className={`fsc-modal-submit${loading ? ' loading' : ''}`} disabled={loading}>
            {loading ? 'Sending…' : 'Download Now →'}
          </button>
        </form>
        <p className="fsc-modal-note">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}


function hasLeadCapture() {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return Boolean(data?.email);
  } catch {
    return false;
  }
}

function triggerDownload(project) {
  if (project.downloadUrl && project.downloadUrl !== '#') {
    window.open(project.downloadUrl, '_blank', 'noopener,noreferrer');
  }
}

export default function FreeSourceCodePage() {
  const [ref, vis] = useInView({ threshold: 0.05 });
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [tech, setTech] = useState('All');
  const [leadProject, setLeadProject] = useState(null);
  const [reviewProject, setReviewProject] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SOURCE_PROJECTS.filter((p) => {
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
      const matchTech = tech === 'All' || p.techStack.some((t) => t.includes(tech) || t === tech);
      const matchSearch = !q
        || p.title.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || p.tag.toLowerCase().includes(q)
        || p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchDiff && matchTech && matchSearch;
    });
  }, [search, difficulty, tech]);

  const completeDownload = (project) => {
    setReviewProject(null);
    triggerDownload(project);
    addToast(`Downloading ${project.title}`, 'success');
  };

  const handleDownload = (project) => {
    if (!hasLeadCapture()) {
      setLeadProject(project);
      return;
    }
    setReviewProject(project);
  };

  const handleLeadSuccess = (project) => {
    setLeadProject(null);
    setReviewProject(project);
  };

  const handlePreview = (project) => {
    if (project.previewUrl && project.previewUrl !== '#') {
      window.open(project.previewUrl, '_blank', 'noopener,noreferrer');
    } else {
      addToast('Live preview coming soon!', 'error');
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Navbar />
      <main className={`fsc-page section-hidden${vis ? ' section-visible' : ''}`} ref={ref}>
        <div className="fsc-page-glow" />
        <section className="fsc-page-hero">
          <p className="fsc-page-eyebrow">
            <Link to="/">Home</Link> / Free Source Code
          </p>
          <h1>
            Free Source <span className="accent">Code</span>
          </h1>
          <p className="fsc-page-lead">
            Download production-ready templates and projects. Preview live demos, filter by stack,
            and grab the code — free from PIXELNEST.
          </p>
        </section>

        <section className="fsc-toolbar">
          <div className="fsc-search-wrap">
            <span className="fsc-search-icon" aria-hidden>🔍</span>
            <input
              type="search"
              placeholder="Search projects, tags, or tech…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
            />
          </div>
          <div className="fsc-filters">
            <label>
              <span>Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                {SOURCE_DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Tech stack</span>
              <select value={tech} onChange={(e) => setTech(e.target.value)}>
                {SOURCE_TECH_FILTERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <p className="fsc-results-count">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div className="fsc-empty">
            <p>No projects match your filters.</p>
            <button
              type="button"
              className="fsc-btn-preview"
              onClick={() => { setSearch(''); setDifficulty('All'); setTech('All'); }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="fsc-grid">
            {filtered.map((p) => (
              <SourceCard
                key={p.id}
                project={p}
                onDownload={handleDownload}
                onPreview={handlePreview}
              />
            ))}
          </div>
        )}

        <section className="fsc-page-cta">
          <p>Need a custom website built for your brand?</p>
          <Link to="/#contact" className="btn-primary">Get In Touch →</Link>
        </section>
      </main>
      <Footer />
      {leadProject && (
        <LeadModal
          project={leadProject}
          onClose={() => setLeadProject(null)}
          onSuccess={handleLeadSuccess}
        />
      )}
      {reviewProject && (
        <ReviewModal
          project={reviewProject}
          onSkip={completeDownload}
          onComplete={completeDownload}
        />
      )}
    </>
  );
}
