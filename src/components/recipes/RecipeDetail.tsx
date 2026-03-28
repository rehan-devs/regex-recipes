import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share } from 'lucide-react';
import { Recipe } from '../../types';
import { useRegexStore } from '../../stores/regexStore';
import { PatternInput } from '../playground/PatternInput';
import { FlagsSelector } from '../playground/FlagsSelector';
import { TestStringArea } from '../playground/TestStringArea';
import { MatchesDisplay } from '../playground/MatchesDisplay';
import { ExplanationPanel } from '../playground/ExplanationPanel';
import { CodeSnippets } from '../snippets/CodeSnippets';
import { EdgeCaseTable } from './EdgeCaseTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { showToast } from '../ui/Toast';
import { RegexFlags } from '../../types';

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const navigate = useNavigate();

  const pattern = useRegexStore((s) => s.pattern);
  const testString = useRegexStore((s) => s.testString);
  const flags = useRegexStore((s) => s.flags);
  const matches = useRegexStore((s) => s.matches);
  const error = useRegexStore((s) => s.error);
  const explanation = useRegexStore((s) => s.explanation);
  const setPattern = useRegexStore((s) => s.setPattern);
  const setTestString = useRegexStore((s) => s.setTestString);
  const toggleFlag = useRegexStore((s) => s.toggleFlag);
  const loadRecipe = useRegexStore((s) => s.loadRecipe);

  const [isEditing, setIsEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      loadRecipe(recipe);
    } catch (e) {
      console.error('Failed to load recipe:', e);
    }
    setLoaded(true);
  }, [recipe.slug]);

  const handleToggleFlag = (flag: keyof RegexFlags) => {
    toggleFlag(flag);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/recipes/${recipe.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard');
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const difficultyVariant: Record<string, 'success' | 'accent' | 'error'> = {
    beginner: 'success',
    intermediate: 'accent',
    advanced: 'error',
  };

  if (!loaded) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-32 bg-muted dark:bg-muted-dark rounded animate-pulse" />
        <div className="h-8 w-64 bg-muted dark:bg-muted-dark rounded animate-pulse" />
        <div className="h-40 bg-muted dark:bg-muted-dark rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/recipes')}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-foreground dark:hover:text-foreground-dark mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Recipes
      </button>

      <div className="flex items-start gap-3 mb-8">
        <span className="text-3xl">{recipe.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
              {recipe.name}
            </h1>
            <Badge variant={difficultyVariant[recipe.difficulty] || 'default'}>
              {recipe.difficulty}
            </Badge>
            <Badge>{recipe.category}</Badge>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
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

          <div className="flex items-center gap-2 flex-wrap">
            {pattern && <CopyButton text={pattern} label="Copy pattern" size="md" />}
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share size={14} />
              Share
            </Button>
          </div>

          <div className="border-t border-border dark:border-border-dark pt-6">
            <EdgeCaseTable edgeCases={recipe.edgeCases} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <ExplanationPanel tokens={explanation} />
          <div className="border-t border-border dark:border-border-dark pt-6">
            <CodeSnippets snippets={recipe.codeSnippets} />
          </div>
        </div>
      </div>
    </div>
  );
}