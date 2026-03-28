import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  resolved: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: 'light' | 'dark' | 'system'): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

function applyTheme(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

const stored = typeof localStorage !== 'undefined'
  ? (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
  : 'system';

const initialResolved = resolveTheme(stored);
applyTheme(initialResolved);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: stored,
  resolved: initialResolved,
  setTheme: (theme) => {
    const resolved = resolveTheme(theme);
    applyTheme(resolved);
    localStorage.setItem('theme', theme);
    set({ theme, resolved });
  },
}));

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const state = useThemeStore.getState();
    if (state.theme === 'system') {
      const resolved = getSystemTheme();
      applyTheme(resolved);
      useThemeStore.setState({ resolved });
    }
  });
}