import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover shadow-subtle',
    secondary:
      'border border-border dark:border-border-dark bg-transparent text-foreground dark:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark',
    ghost:
      'bg-transparent text-muted-foreground dark:text-muted-dark-foreground hover:bg-muted dark:hover:bg-muted-dark hover:text-foreground dark:hover:text-foreground-dark',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded gap-1.5',
    md: 'text-sm px-3.5 py-2 rounded gap-2',
    lg: 'text-sm px-5 py-2.5 rounded-lg gap-2',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}