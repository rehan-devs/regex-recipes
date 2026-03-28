import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PlaygroundView } from '../components/playground/PlaygroundView';
import { useRegexStore } from '../stores/regexStore';

export function PlaygroundPage() {
  const [searchParams] = useSearchParams();
  const { setPattern, setTestString, setFlags } = useRegexStore();

  useEffect(() => {
    const p = searchParams.get('p');
    const t = searchParams.get('t');
    const f = searchParams.get('f');

    if (p) {
      try { setPattern(atob(p)); } catch { /* ignore */ }
    }
    if (t) {
      try { setTestString(atob(t)); } catch { /* ignore */ }
    }
    if (f) {
      setFlags({
        global: f.includes('g'),
        caseInsensitive: f.includes('i'),
        multiline: f.includes('m'),
        dotall: f.includes('s'),
        unicode: f.includes('u'),
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-2">
          Playground
        </h1>
        <p className="text-sm text-muted-foreground dark:text-muted-dark-foreground">
          Write and test your own regex patterns.
        </p>
      </div>
      <PlaygroundView />
    </div>
  );
}