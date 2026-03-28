import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default:
      'bg-muted dark:bg-muted-dark text-neutral-600 dark:text-neutral-300',
    accent:
      'bg-accent-muted dark:bg-accent-muted-dark text-orange-700 dark:text-orange-300',
    success:
      'bg-success-muted dark:bg-success-muted-dark text-green-700 dark:text-green-300',
    error:
      'bg-error-muted dark:bg-error-muted-dark text-red-700 dark:text-red-300',
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}