import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  const difficultyVariant = {
    beginner: 'success' as const,
    intermediate: 'accent' as const,
    advanced: 'error' as const,
  };

  return (
    <Card
      interactive
      onClick={() => navigate(`/recipes/${recipe.slug}`)}
      className="p-4 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl" role="img" aria-label={recipe.name}>
          {recipe.icon}
        </span>
        <Badge variant={difficultyVariant[recipe.difficulty]}>
          {recipe.difficulty}
        </Badge>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-foreground dark:text-foreground-dark">
          {recipe.name}
        </h3>
        <p className="text-xs text-muted-foreground dark:text-muted-dark-foreground mt-0.5 leading-relaxed">
          {recipe.description}
        </p>
      </div>
      <div className="mt-auto pt-2">
        <code className="text-[11px] font-mono text-muted-foreground dark:text-muted-dark-foreground bg-muted dark:bg-muted-dark px-1.5 py-0.5 rounded break-all line-clamp-1">
          {recipe.pattern.length > 45
            ? recipe.pattern.slice(0, 45) + '…'
            : recipe.pattern}
        </code>
      </div>
    </Card>
  );
}