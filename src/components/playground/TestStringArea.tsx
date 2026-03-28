import React from 'react';
import { HighlightedText } from './HighlightedText';
import { MatchResult } from '../../types';

interface TestStringAreaProps {
  value: string;
  onChange: (value: string) => void;
  matches: MatchResult[];
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function TestStringArea({ value, onChange, matches, isEditing, onToggleEdit }: TestStringAreaProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          Test String
        </label>
        <button
          onClick={onToggleEdit}
          className="text-xs text-orange-700 dark:text-orange-300 hover:underline"
        >
          {isEditing ? 'Show highlights' : 'Edit'}
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full font-mono text-sm p-3 bg-white dark:bg-[#141414] border border-border dark:border-border-dark rounded-lg
            text-foreground dark:text-foreground-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
            resize-y min-h-[120px] transition-all duration-150 scrollbar-thin"
          placeholder="Paste your test string here..."
          spellCheck={false}
          rows={6}
        />
      ) : (
        <div
          className="p-3 bg-white dark:bg-[#141414] border border-border dark:border-border-dark rounded-lg min-h-[120px] max-h-[300px] overflow-y-auto cursor-text scrollbar-thin"
          onClick={onToggleEdit}
        >
          <HighlightedText text={value} matches={matches} />
        </div>
      )}
    </div>
  );
}