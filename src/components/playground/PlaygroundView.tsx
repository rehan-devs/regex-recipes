import React, { useState, useEffect } from 'react';
import { PatternInput } from './PatternInput';
import { FlagsSelector } from './FlagsSelector';
import { TestStringArea } from './TestStringArea';
import { MatchesDisplay } from './MatchesDisplay';
import { ExplanationPanel } from './ExplanationPanel';
import { useRegexStore } from '../../stores/regexStore';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { Trash2, Share } from 'lucide-react';
import { showToast } from '../ui/Toast';
import { RegexFlags } from '../../types';

export function PlaygroundView() {
  const pattern = useRegexStore((s) => s.pattern);
  const testString = useRegexStore((s) => s.testString);
  const flags = useRegexStore((s) => s.flags);
  const matches = useRegexStore((s) => s.matches);
  const error = useRegexStore((s) => s.error);
  const explanation = useRegexStore((s) => s.explanation);
  const setPattern = useRegexStore((s) => s.setPattern);
  const setTestString = useRegexStore((s) => s.setTestString);
  const toggleFlag = useRegexStore((s) => s.toggleFlag);
  const clear = useRegexStore((s) => s.clear);

  const [isEditing, setIsEditing] = useState(true);

  // DEBUG: Log when flags change
  useEffect(() => {
    console.log('PlaygroundView - flags changed:', flags);
  }, [flags]);

  // DEBUG: Log when matches change
  useEffect(() => {
    console.log('PlaygroundView - matches changed:', matches);
  }, [matches]);

  const handleToggleFlag = (flag: keyof RegexFlags) => {
    console.log('Toggle flag clicked:', flag, 'current value:', flags[flag]);
    toggleFlag(flag);
  };

  const handleShare = async () => {
    try {
      const params = new URLSearchParams();
      params.set('p', btoa(pattern));
      params.set('t', btoa(testString));
      const flagStr =
        (flags.global ? 'g' : '') +
        (flags.caseInsensitive ? 'i' : '') +
        (flags.multiline ? 'm' : '') +
        (flags.dotall ? 's' : '') +
        (flags.unicode ? 'u' : '');
      params.set('f', flagStr);
      const url = `${window.location.origin}/playground?${params.toString()}`;
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard');
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <PatternInput value={pattern} onChange={setPattern} error={error} />
      <FlagsSelector flags={flags} onToggle={handleToggleFlag} />
      <TestStringArea
        value={testString}
        onChange={setTestString}
        matches={matches}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />
      <MatchesDisplay matches={matches} />

      {/* DEBUG info */}
      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 p-2 bg-muted dark:bg-muted-dark rounded">
        Flags: {flags.global ? 'g' : ''}{flags.caseInsensitive ? 'i' : ''}{flags.multiline ? 'm' : ''}{flags.dotall ? 's' : ''}{flags.unicode ? 'u' : ''} | 
        Matches: {matches.length}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {pattern && <CopyButton text={pattern} label="Copy pattern" size="md" />}
        {pattern && (
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share size={14} />
            Share
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={clear}>
          <Trash2 size={14} />
          Clear
        </Button>
      </div>

      {explanation.length > 0 && (
        <div className="border-t border-border dark:border-border-dark pt-6">
          <ExplanationPanel tokens={explanation} />
        </div>
      )}
    </div>
  );
}