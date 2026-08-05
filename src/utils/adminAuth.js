const AUTH_KEY = 'admin_auth';
const CREDENTIALS_KEY = 'admin_credentials';

const defaultCredentials = {
  email: 'admin@portfolio.com',
  password: 'admin123',
};

export const getCredentials = () => {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    return raw ? JSON.parse(raw) : defaultCredentials;
  } catch {
    return defaultCredentials;
  }
};

export const login = (email, password) => {
  const creds = getCredentials();
  if (email === creds.email && password === creds.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: new Date().toISOString() }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) !== null;
};

export const getAuthUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};