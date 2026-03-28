import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Github, FlaskConical } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

export function Header() {
  const location = useLocation();
  const { resolved, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    if (path === '/recipes') {
      return location.pathname === '/' || location.pathname.startsWith('/recipes');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border dark:border-border-dark bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground dark:text-foreground-dark font-semibold text-base hover:opacity-80 transition-opacity"
          >
            <FlaskConical size={20} className="text-accent" />
            <span>Regex Recipes</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/recipes"
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150
                ${isActive('/recipes')
                  ? 'text-foreground dark:text-foreground-dark bg-muted dark:bg-muted-dark'
                  : 'text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted/50 dark:hover:bg-muted-dark/50'
                }`}
            >
              Recipes
            </Link>
            <Link
              to="/playground"
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150
                ${isActive('/playground')
                  ? 'text-foreground dark:text-foreground-dark bg-muted dark:bg-muted-dark'
                  : 'text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted/50 dark:hover:bg-muted-dark/50'
                }`}
            >
              Playground
            </Link>

            <div className="w-px h-5 bg-border dark:bg-border-dark mx-1" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors duration-150"
              aria-label={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolved === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="https://github.com/rehan-devs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors duration-150"
              aria-label="View on GitHub"
            >
              <Github size={18} />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}