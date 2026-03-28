import React from 'react';
import { MatchResult } from '../../types';

interface MatchesDisplayProps {
  matches: MatchResult[];
}

export function MatchesDisplay({ matches }: MatchesDisplayProps) {
  if (matches.length === 0) {
    return (
      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        No matches found
      </div>
    );
  }

  return (
    <div>
      <div
        className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2"
        aria-live="polite"
      >
        {matches.length} match{matches.length !== 1 ? 'es' : ''} found
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
        {matches.map((match, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 text-xs px-2 py-1.5 rounded bg-muted dark:bg-muted-dark"
          >
            <span className="text-neutral-500 dark:text-neutral-400 font-mono shrink-0">
              {i + 1}.
            </span>
            <span className="font-mono text-foreground dark:text-foreground-dark break-all">
              {match.text}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 shrink-0 ml-auto">
              @{match.index}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}