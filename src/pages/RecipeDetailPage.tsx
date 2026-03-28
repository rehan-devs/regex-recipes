import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRecipeBySlug } from '../data/recipes';
import { RecipeDetail } from '../components/recipes/RecipeDetail';

export function RecipeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? getRecipeBySlug(slug) : undefined;

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <RecipeDetail key={recipe.slug} recipe={recipe} />
    </div>
  );
}