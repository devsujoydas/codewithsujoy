const KEYS = {
  projects: "admin_projects",
  blogs: "admin_blogs",
  messages: "admin_messages",
  testimonials: "admin_testimonials",
  skills: "admin_skills",
  about: "admin_about",
  notices: "admin_notices",
  settings: "admin_settings",
};

function get(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const uid = () => crypto.randomUUID();

// Projects
export const getProjects = () => get(KEYS.projects, []);
export const saveProjects = (p) => set(KEYS.projects, p);
export const addProject = (p) => {
  const all = getProjects();
  const n = { ...p, id: uid(), createdAt: new Date().toISOString() };
  all.unshift(n);
  saveProjects(all);
  return n;
};
export const updateProject = (id, data) => {
  const all = getProjects().map((p) => (p.id === id ? { ...p, ...data } : p));
  saveProjects(all);
};
export const deleteProject = (id) => {
  saveProjects(getProjects().filter((p) => p.id !== id));
};

// Blogs
export const getBlogs = () => get(KEYS.blogs, []);
export const saveBlogs = (b) => set(KEYS.blogs, b);
export const addBlog = (b) => {
  const all = getBlogs();
  const n = { ...b, id: uid(), createdAt: new Date().toISOString() };
  all.unshift(n);
  saveBlogs(all);
  return n;
};
export const updateBlog = (id, data) => {
  saveBlogs(getBlogs().map((b) => (b.id === id ? { ...b, ...data } : b)));
};
export const deleteBlog = (id) => {
  saveBlogs(getBlogs().filter((b) => b.id !== id));
};

// Messages
export const getMessages = () => get(KEYS.messages, []);
export const saveMessages = (m) => set(KEYS.messages, m);
export const addMessage = (m) => {
  const all = getMessages();
  const n = { ...m, id: uid(), read: false, createdAt: new Date().toISOString() };
  all.unshift(n);
  saveMessages(all);
  return n;
};
export const toggleMessageRead = (id) => {
  saveMessages(getMessages().map((m) => (m.id === id ? { ...m, read: !m.read } : m)));
};
export const deleteMessage = (id) => {
  saveMessages(getMessages().filter((m) => m.id !== id));
};

// Testimonials
export const getTestimonials = () => get(KEYS.testimonials, []);
export const saveTestimonials = (t) => set(KEYS.testimonials, t);
export const addTestimonial = (t) => {
  const all = getTestimonials();
  const n = { ...t, id: uid(), createdAt: new Date().toISOString() };
  all.unshift(n);
  saveTestimonials(all);
  return n;
};
export const updateTestimonial = (id, data) => {
  saveTestimonials(getTestimonials().map((t) => (t.id === id ? { ...t, ...data } : t)));
};
export const deleteTestimonial = (id) => {
  saveTestimonials(getTestimonials().filter((t) => t.id !== id));
};

// Skills
export const getSkills = () => get(KEYS.skills, []);
export const saveSkills = (s) => set(KEYS.skills, s);
export const addSkill = (s) => {
  const all = getSkills();
  const n = { ...s, id: uid(), createdAt: new Date().toISOString() };
  all.unshift(n);
  saveSkills(all);
  return n;
};
export const updateSkill = (id, data) => {
  saveSkills(getSkills().map((s) => (s.id === id ? { ...s, ...data } : s)));
};
export const deleteSkill = (id) => {
  saveSkills(getSkills().filter((s) => s.id !== id));
};

// About
const defaultAbout = {
  bio: "Passionate Frontend Developer skilled in React.js, Tailwind CSS, and Firebase.",
  profileImage: "",
  resumeUrl: "",
  experience: [],
  education: [],
};
export const getAbout = () => get(KEYS.about, defaultAbout);
export const saveAbout = (a) => set(KEYS.about, a);

// Notices
export const getNotices = () => get(KEYS.notices, []);
export const saveNotices = (n) => set(KEYS.notices, n);
export const addNotice = (n) => {
  const all = getNotices();
  const item = { ...n, id: uid(), createdAt: new Date().toISOString() };
  all.unshift(item);
  saveNotices(all);
  return item;
};
export const updateNotice = (id, data) => {
  saveNotices(getNotices().map((n) => (n.id === id ? { ...n, ...data } : n)));
};
export const deleteNotice = (id) => {
  saveNotices(getNotices().filter((n) => n.id !== id));
};

// Settings
const defaultSettings = {
  websiteTitle: "Sujoy Das - Portfolio",
  logo: "",
  favicon: "",
  socialLinks: {
    github: "https://github.com/devsujoydas",
    linkedin: "https://www.linkedin.com/in/devsujoydas/",
    facebook: "https://www.facebook.com/devsujoydas",
    instagram: "https://www.instagram.com/devsujoydas",
    youtube: "https://www.youtube.com/@devsujoydas",
    whatsapp: "https://api.whatsapp.com/send/?phone=%2B8801303436299",
  },
  contactInfo: { email: "", phone: "+8801303436299", address: "" },
  seoTitle: "Sujoy Das - MERN Stack Developer",
  seoDescription: "Portfolio of Sujoy Das, a passionate MERN Stack Developer.",
};
export const getSettings = () => get(KEYS.settings, defaultSettings);
export const saveSettings = (s) => set(KEYS.settings, s);