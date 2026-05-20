export const WHATSAPP_NUMBER = '918273636942';
export const WHATSAPP_MSG = "Hi PIXELNEST! I'm interested in a website.";
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

export const NAV_LINKS = ['Home', 'About', 'Services', 'Pricing', 'Work'];

export const SERVICE_PILLS = [
  'Business Websites',
  'Landing Pages',
  'E-commerce Sites',
  'UI/UX Design',
];

export const SCROLL_TRUST_ITEMS = [
  'Google ⭐⭐⭐⭐⭐',
  '50+ Projects',
  '30+ Happy Clients',
  '100% Satisfaction',
  "Mathura's #1 Web Design Agency",
];

export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹4,999',
    features: [
      '3-page website',
      'Mobile responsive design',
      'Contact form integration',
      '7-day delivery',
    ],
    popular: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹9,999',
    features: [
      '5-page website',
      'SEO optimized structure',
      'WhatsApp integration',
      '14-day delivery',
    ],
    popular: true,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    price: '₹19,999+',
    features: [
      'Full online store setup',
      'Payment gateway integration',
      'Admin panel included',
      '21-day delivery',
    ],
    popular: false,
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 'grand-horizon',
    name: 'Grand Horizon Hotel',
    industry: 'Hospitality',
    tag: 'Business Site',
    previewUrl: '#',
    theme: 'hotel',
  },
  {
    id: 'iron-pulse',
    name: 'Iron Pulse Gym',
    industry: 'Fitness & Wellness',
    tag: 'Landing Page',
    previewUrl: '#',
    theme: 'gym',
  },
  {
    id: 'mathura-bazaar',
    name: 'Mathura Bazaar',
    industry: 'Retail & E-commerce',
    tag: 'E-commerce',
    previewUrl: '#',
    theme: 'ecommerce',
  },
  {
    id: 'spice-route',
    name: 'Spice Route Kitchen',
    industry: 'Food & Restaurant',
    tag: 'Business Site',
    previewUrl: '#',
    theme: 'restaurant',
  },
];

export const APPROACH_STEPS = [
  { num: 1, icon: '🔍', title: 'Discover', desc: 'Understand your business, goals and target audience.' },
  { num: 2, icon: '📋', title: 'Plan', desc: 'Plan the structure, content and user flow.' },
  { num: 3, icon: '✏️', title: 'Design', desc: 'Create modern, clean and engaging designs.' },
  { num: 4, icon: '</>', title: 'Develop', desc: 'Build fast, responsive and SEO-friendly websites.' },
  { num: 5, icon: '🚀', title: 'Deliver', desc: 'Test, launch and support your website for growth.' },
];

export const FEATURES = [
  { icon: '🎨', title: 'Modern & Unique Design', desc: 'Pixel-perfect, handcrafted designs that set your brand apart from the competition.' },
  { icon: '📱', title: 'Responsive Across All Devices', desc: 'Flawless experience on phones, tablets, laptops and desktops.' },
  { icon: '🔍', title: 'SEO Optimized', desc: 'Built-in search engine optimization so your customers find you first.' },
  { icon: '⚡', title: 'Fast Loading Performance', desc: 'Lightning-fast load times that keep visitors engaged and boost rankings.' },
  { icon: '🎯', title: 'Conversion Focused', desc: 'Strategic layouts designed to turn visitors into paying customers.' },
  { icon: '⚙️', title: 'Easy to Manage & Scale', desc: 'Simple content management so you can grow without limits.' },
];

export const TRUST_BAR = [
  { icon: '👤', label: 'Client Focused' },
  { icon: '⏰', label: 'On-Time Delivery' },
  { icon: '🤝', label: 'Long Term Support' },
];

export const STATS = [
  { target: 50, suffix: '+', label: 'Projects Completed' },
  { target: 30, suffix: '+', label: 'Happy Clients' },
  { target: 100, suffix: '%', label: 'Client Satisfaction' },
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    business: 'Grand Horizon Hotel',
    city: 'Mathura',
    text: 'PIXELNEST transformed our online presence completely. Bookings increased by 40% within the first month of launch.',
    init: 'RS',
  },
  {
    name: 'Priya Mehta',
    business: 'Iron Pulse Gym',
    city: 'Delhi NCR',
    text: 'Our new website looks absolutely stunning. Members love the online class booking feature — highly professional team.',
    init: 'PM',
  },
  {
    name: 'Arjun Patel',
    business: 'Brew & Bean Cafe',
    city: 'Mathura',
    text: 'The website PIXELNEST built for us is gorgeous. Our online orders doubled in just a few weeks after going live.',
    init: 'AP',
  },
];

export const SOURCE_DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const SOURCE_TECH_FILTERS = ['All', 'HTML/CSS', 'JavaScript', 'React', 'Tailwind', 'Framer Motion'];

export const FEATURED_SOURCE_ID = 'proposal-page';
export const SECONDARY_FEATURED_ID = 'modern-animated-portfolio';

export const SPOTLIGHT_SOURCE_IDS = [FEATURED_SOURCE_ID, SECONDARY_FEATURED_ID];

export function isSourceProjectAvailable(project) {
  const hasPreview = project.previewUrl && project.previewUrl !== '#';
  const hasDownload = project.downloadUrl && project.downloadUrl !== '#';
  return hasPreview && hasDownload;
}

export const SOURCE_PROJECTS = [
  {
    id: 'proposal-page',
    title: 'Will You Be My Girl? 💌',
    featured: true,
    tag: 'Interactive',
    description: 'A cute interactive proposal page with envelope reveal animation, GIFs, and Yes/No interaction.',
    techStack: ['HTML/CSS', 'JavaScript'],
    difficulty: 'Beginner',
    previewUrl: 'https://wonderful-twilight-6f212f.netlify.app/',
    downloadUrl: 'https://drive.google.com/file/d/1F8nsYlLdFfQzyonPXR2-5hfmW7w8eiaF/view?usp=drive_link',
    previewTheme: 'romantic',
    isNew: true,
    available: true,
  },
  {
    id: 'agency-landing',
    title: 'Agency Landing Page',
    tag: 'Business',
    description: 'Dark luxury landing page with hero, services grid, testimonials, and contact CTA sections.',
    techStack: ['HTML/CSS', 'JavaScript'],
    difficulty: 'Intermediate',
    previewUrl: '#',
    downloadUrl: '#',
    previewTheme: 'agency',
    isNew: false,
    available: false,
  },
  {
    id: 'modern-animated-portfolio',
    title: "I'm So Sorry",
    tag: 'Apology Page',
    description: 'A cute interactive apology-style web page with emotional animations, romantic UI and aesthetic kitty visuals.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    difficulty: 'Intermediate',
    previewUrl: 'https://preeminent-pothos-5ea1fe.netlify.app',
    downloadUrl: 'https://drive.google.com/file/d/1hZ0R5vpLHgn-B4NVYtY0rEVOfRhnzcW5/view?usp=sharing',
    previewTheme: 'romantic',
    isNew: true,
    available: true,
    spotlight: true,
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Dashboard UI',
    tag: 'Dashboard',
    description: 'Analytics dashboard layout with sidebar navigation, stat cards, and data visualization placeholders.',
    techStack: ['React', 'Tailwind'],
    difficulty: 'Advanced',
    previewUrl: '#',
    downloadUrl: '#',
    previewTheme: 'dashboard',
    isNew: true,
    available: false,
  },
  {
    id: 'restaurant-menu',
    title: 'Restaurant Menu Site',
    tag: 'Food & Drink',
    description: 'Elegant restaurant website with menu categories, reservation form, and location map section.',
    techStack: ['HTML/CSS', 'JavaScript'],
    difficulty: 'Beginner',
    previewUrl: '#',
    downloadUrl: '#',
    previewTheme: 'restaurant',
    isNew: false,
    available: false,
  },
  {
    id: 'startup-landing',
    title: 'Startup Launch Page',
    tag: 'Startup',
    description: 'High-conversion startup landing with pricing tiers, feature highlights, and email capture.',
    techStack: ['HTML/CSS', 'Tailwind'],
    difficulty: 'Beginner',
    previewUrl: '#',
    downloadUrl: '#',
    previewTheme: 'startup',
    isNew: false,
    available: false,
  },
];

export const LEAD_STORAGE_KEY = 'pixelnest_download_lead';
export const REVIEW_STORAGE_KEY = 'pixelnest_fsc_reviews';
