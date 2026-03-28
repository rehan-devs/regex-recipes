import React from 'react';
import { RegexFlags } from '../../types';

interface FlagsSelectorProps {
  flags: RegexFlags;
  onToggle: (flag: keyof RegexFlags) => void;
}

const flagItems: { key: keyof RegexFlags; label: string; char: string; description: string }[] = [
  { key: 'global', label: 'Global', char: 'g', description: 'Find all matches, not just the first' },
  { key: 'caseInsensitive', label: 'Case Insensitive', char: 'i', description: 'Match regardless of case' },
  { key: 'multiline', label: 'Multiline', char: 'm', description: '^ and $ match line start/end' },
  { key: 'dotall', label: 'Dot All', char: 's', description: '. also matches newline characters' },
  { key: 'unicode', label: 'Unicode', char: 'u', description: 'Enable Unicode matching' },
];

export function FlagsSelector({ flags, onToggle }: FlagsSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
        Flags:
      </span>
      {flagItems.map(({ key, label, char, description }) => {
        const isActive = flags[key];
        return (
          <button
            key={key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle(key);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border transition-all duration-150 select-none
              ${isActive
                ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700 font-semibold'
                : 'bg-muted dark:bg-muted-dark text-neutral-500 dark:text-neutral-400 border-transparent hover:text-foreground dark:hover:text-foreground-dark hover:border-border dark:hover:border-border-dark'
              }`}
            title={`${label}: ${description}`}
            aria-label={`${label} flag (${char}): ${isActive ? 'enabled' : 'disabled'}. ${description}`}
            aria-pressed={isActive}
          >
            {char}
          </button>
        );
      })}
    </div>
  );
}