import React from 'react';
import { ExplanationToken } from '../../types';

interface ExplanationPanelProps {
  tokens: ExplanationToken[];
}

export function ExplanationPanel({ tokens }: ExplanationPanelProps) {
  if (tokens.length === 0) {
    return (
      <div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
        Enter a pattern to see its explanation...
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">
        Explanation
      </h3>
      <div className="space-y-0.5 max-h-[400px] overflow-y-auto scrollbar-thin">
        {tokens.map((token, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-muted dark:hover:bg-muted-dark transition-colors"
          >
            <code className="font-mono text-xs text-orange-700 dark:text-orange-300 bg-accent-muted dark:bg-accent-muted-dark px-1.5 py-0.5 rounded shrink-0 max-w-[140px] truncate">
              {token.token}
            </code>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {token.explanation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}