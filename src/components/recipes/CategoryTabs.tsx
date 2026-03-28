import React from 'react';
import { categories } from '../../data/recipes';

interface CategoryTabsProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150
            ${active === cat.id
              ? 'bg-foreground dark:bg-foreground-dark text-white dark:text-[#0A0A0A]'
              : 'text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark'
            }`}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}