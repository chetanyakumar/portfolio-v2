import { useState, useEffect, useRef } from 'react';

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

export function useCounter(target, duration = 2000, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(id);
      } else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, removing: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    }, 3000);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
  return { toasts, addToast, removeToast };
}
