import { create } from 'zustand';
import { HistoryItem } from '../types';

interface HistoryState {
  items: HistoryItem[];
  addItem: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

const MAX_ITEMS = 30;

function loadHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem('regex-history');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem('regex-history', JSON.stringify(items));
  } catch {}
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  items: loadHistory(),

  addItem: (item) => {
    const state = get();
    // Deduplicate
    const existing = state.items.find(
      (i) => i.pattern === item.pattern && i.flags === item.flags
    );
    if (existing) {
      const updated = state.items.filter((i) => i.id !== existing.id);
      const newItem: HistoryItem = {
        ...item,
        id: existing.id,
        timestamp: Date.now(),
      };
      const newItems = [newItem, ...updated].slice(0, MAX_ITEMS);
      saveHistory(newItems);
      set({ items: newItems });
      return;
    }

    const newItem: HistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    const newItems = [newItem, ...state.items].slice(0, MAX_ITEMS);
    saveHistory(newItems);
    set({ items: newItems });
  },

  removeItem: (id) => {
    const state = get();
    const newItems = state.items.filter((i) => i.id !== id);
    saveHistory(newItems);
    set({ items: newItems });
  },

  clearAll: () => {
    saveHistory([]);
    set({ items: [] });
  },
}));