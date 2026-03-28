import React, { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({ text, className = '', label, size = 'sm' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const sizeClasses = size === 'sm' ? 'p-1.5' : 'px-3 py-1.5';
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded transition-colors duration-150
        ${copied
          ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark'
        } ${sizeClasses} ${className}`}
      aria-label={copied ? 'Copied' : `Copy ${label || 'to clipboard'}`}
    >
      {copied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
      {label && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  );
}