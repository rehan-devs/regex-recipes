import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Language } from '../../types';

interface CodeSnippetsProps {
  snippets: Record<Language, string>;
}

const languages: { id: Language; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'php', label: 'PHP' },
  { id: 'java', label: 'Java' },
];

export function CodeSnippets({ snippets }: CodeSnippetsProps) {
  const [active, setActive] = useState<Language>('javascript');

  return (
    <div>
      <h3 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">
        Code Snippets
      </h3>
      <div className="flex flex-wrap gap-1 mb-3">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActive(lang.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors duration-150
              ${active === lang.id
                ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark'
              }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <CodeBlock code={snippets[active]} language={active} />
    </div>
  );
}