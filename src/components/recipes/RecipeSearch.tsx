import React from 'react';
import { Search, X } from 'lucide-react';

interface RecipeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function RecipeSearch({ value, onChange }: RecipeSearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-muted-dark-foreground pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search recipes... "email", "phone", "date"...'
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-[#141414] border border-border dark:border-border-dark rounded-lg
          text-foreground dark:text-foreground-dark placeholder:text-muted-foreground dark:placeholder:text-muted-dark-foreground
          focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-150"
        aria-label="Search recipes"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-muted-dark-foreground dark:hover:text-foreground-dark transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}