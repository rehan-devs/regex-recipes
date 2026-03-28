import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  const base =
    'border border-border dark:border-border-dark rounded-lg bg-white dark:bg-[#141414] shadow-card';
  const interactiveClass = interactive
    ? 'cursor-pointer hover:shadow-soft hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-150 hover:scale-[1.01]'
    : '';

  return (
    <div
      className={`${base} ${interactiveClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </div>
  );
}