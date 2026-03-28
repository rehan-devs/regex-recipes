import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';

interface PatternInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export function PatternInput({ value, onChange, error }: PatternInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
        Pattern
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-mono text-sm select-none">
          /
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full font-mono text-sm pl-7 pr-12 py-2.5 bg-white dark:bg-[#141414] border rounded-lg
            text-foreground dark:text-foreground-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            focus:outline-none focus:ring-2 transition-all duration-150
            ${error
              ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500'
              : 'border-border dark:border-border-dark focus:ring-accent/30 focus:border-accent'
            }`}
          placeholder="Enter your regex pattern..."
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-mono text-sm select-none">
          /
        </span>
        {value && (
          <CopyButton
            text={value}
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
          />
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}