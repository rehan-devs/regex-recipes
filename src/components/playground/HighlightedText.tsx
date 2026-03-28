import React from 'react';
import { MatchResult } from '../../types';

interface HighlightedTextProps {
  text: string;
  matches: MatchResult[];
}

const matchColors = [
  { light: 'bg-[#FEF3C7]', dark: 'dark:bg-[#78350F]' },
  { light: 'bg-[#DBEAFE]', dark: 'dark:bg-[#1E3A5F]' },
  { light: 'bg-[#D1FAE5]', dark: 'dark:bg-[#064E3B]' },
  { light: 'bg-[#FCE7F3]', dark: 'dark:bg-[#831843]' },
];

export function HighlightedText({ text, matches }: HighlightedTextProps) {
  if (!text) {
    return (
      <div className="text-sm text-muted-foreground dark:text-muted-dark-foreground italic">
        Enter a test string to see matches...
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <pre className="text-sm font-mono whitespace-pre-wrap break-words text-foreground dark:text-foreground-dark leading-relaxed">
        {text}
      </pre>
    );
  }

  const segments: { text: string; isMatch: boolean; matchIndex: number }[] = [];
  let lastEnd = 0;
  const sorted = [...matches].sort((a, b) => a.index - b.index);

  for (const match of sorted) {
    if (match.index > lastEnd) {
      segments.push({ text: text.slice(lastEnd, match.index), isMatch: false, matchIndex: -1 });
    }
    if (match.index >= lastEnd) {
      segments.push({ text: text.slice(match.index, match.index + match.length), isMatch: true, matchIndex: match.groupIndex });
      lastEnd = match.index + match.length;
    }
  }

  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd), isMatch: false, matchIndex: -1 });
  }

  return (
    <pre className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
      {segments.map((seg, i) => {
        if (!seg.isMatch) {
          return (
            <span key={i} className="text-foreground dark:text-foreground-dark">
              {seg.text}
            </span>
          );
        }
        const colorIdx = seg.matchIndex % matchColors.length;
        const colors = matchColors[colorIdx];
        return (
          <mark
            key={i}
            className={`${colors.light} ${colors.dark} rounded-sm px-0.5 text-foreground dark:text-foreground-dark`}
            title={`Match ${seg.matchIndex + 1}: "${seg.text}"`}
          >
            {seg.text}
          </mark>
        );
      })}
    </pre>
  );
}