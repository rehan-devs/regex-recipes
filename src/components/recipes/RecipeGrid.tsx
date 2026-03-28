import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../../types';

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground dark:text-muted-dark-foreground text-sm">
          No recipes found. Try a different search or use the{' '}
          <a href="/playground" className="text-accent hover:underline">
            Playground
          </a>{' '}
          for custom patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}