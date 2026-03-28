import React, { useState, useMemo } from 'react';
import { RecipeSearch } from '../components/recipes/RecipeSearch';
import { CategoryTabs } from '../components/recipes/CategoryTabs';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { getRecipesByCategory, searchRecipes } from '../data/recipes';
import { useDebounce } from '../hooks/useDebounce';

export function RecipesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const debouncedSearch = useDebounce(search, 150);

  const filteredRecipes = useMemo(() => {
    if (debouncedSearch) {
      const searched = searchRecipes(debouncedSearch);
      if (category === 'all') return searched;
      return searched.filter((r) => r.category === category);
    }
    return getRecipesByCategory(category);
  }, [debouncedSearch, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-2">
          What are you trying to match?
        </h1>
        <p className="text-sm text-muted-foreground dark:text-muted-dark-foreground">
          Pick a recipe to get a tested pattern, code snippets, and edge case documentation.
        </p>
      </div>

      <div className="mb-6">
        <RecipeSearch value={search} onChange={setSearch} />
      </div>

      <div className="mb-6">
        <CategoryTabs active={category} onChange={setCategory} />
      </div>

      <div className="mb-4 text-xs text-muted-foreground dark:text-muted-dark-foreground">
        {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
      </div>

      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
}