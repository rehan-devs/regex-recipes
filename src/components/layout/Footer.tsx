import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-border-dark mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground dark:text-muted-dark-foreground">
          <span>
            Built with care •{' '}
            <a
              href="https://github.com/rehan-devs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground dark:hover:text-foreground-dark underline underline-offset-2"
            >
              Source on GitHub
            </a>
          </span>
          <span>Regex Recipes — Use-case-first regex tool</span>
        </div>
      </div>
    </footer>
  );
}