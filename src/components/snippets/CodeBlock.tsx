import React from 'react';
import { CopyButton } from '../ui/CopyButton';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <CopyButton text={code} label="Copy" size="sm" />
      </div>
      <pre className="text-[13px] font-mono leading-relaxed overflow-x-auto p-4 rounded-lg bg-[#FAFAFA] dark:bg-[#111111] border border-border dark:border-border-dark text-foreground dark:text-foreground-dark scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}