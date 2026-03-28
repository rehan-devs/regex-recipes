import { create } from 'zustand';
import { MatchResult, RegexFlags, ExplanationToken, Recipe } from '../types';
import { explainPattern } from '../utils/regexExplainer';

interface RegexState {
  pattern: string;
  testString: string;
  flags: RegexFlags;
  matches: MatchResult[];
  error: string | null;
  explanation: ExplanationToken[];
  activeRecipe: Recipe | null;

  setPattern: (pattern: string) => void;
  setTestString: (text: string) => void;
  toggleFlag: (flag: keyof RegexFlags) => void;
  setFlags: (flags: Partial<RegexFlags>) => void;
  loadRecipe: (recipe: Recipe) => void;
  clear: () => void;
}

function flagsToString(flags: RegexFlags): string {
  let s = '';
  if (flags.global) s += 'g';
  if (flags.caseInsensitive) s += 'i';
  if (flags.multiline) s += 'm';
  // Check if 's' flag is supported
  try {
    new RegExp('', 's');
    if (flags.dotall) s += 's';
  } catch {
    // 's' flag not supported in this environment
  }
  if (flags.unicode) s += 'u';
  return s;
}

function stringToFlags(s: string): RegexFlags {
  return {
    global: s.includes('g'),
    caseInsensitive: s.includes('i'),
    multiline: s.includes('m'),
    dotall: s.includes('s'),
    unicode: s.includes('u'),
  };
}

function computeMatches(
  pattern: string,
  testString: string,
  flags: RegexFlags
): { matches: MatchResult[]; error: string | null } {
  if (!pattern) return { matches: [], error: null };
  if (!testString) return { matches: [], error: null };

  let regex: RegExp;
  const flagString = flagsToString(flags);
  
  try {
    regex = new RegExp(pattern, flagString);
  } catch (e) {
    return { matches: [], error: e instanceof Error ? e.message : 'Invalid pattern' };
  }

  const results: MatchResult[] = [];

  try {
    if (flags.global) {
      regex.lastIndex = 0;
      let match: RegExpExecArray | null;
      let count = 0;
      const maxIterations = 10000;
      
      while ((match = regex.exec(testString)) !== null && count < maxIterations) {
        results.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
          groups: match.groups ? { ...match.groups } : undefined,
          groupIndex: results.length,
        });
        
        // Prevent infinite loop on zero-width matches
        if (match[0].length === 0) {
          regex.lastIndex++;
          if (regex.lastIndex > testString.length) break;
        }
        
        count++;
      }
    } else {
      // Non-global mode - find first match only
      const match = regex.exec(testString);
      if (match) {
        results.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
          groups: match.groups ? { ...match.groups } : undefined,
          groupIndex: 0,
        });
      }
    }
  } catch (e) {
    return { matches: [], error: e instanceof Error ? e.message : 'Execution error' };
  }

  return { matches: results, error: null };
}

function safeExplain(pattern: string): ExplanationToken[] {
  try {
    return explainPattern(pattern);
  } catch {
    return [];
  }
}

export const useRegexStore = create<RegexState>()((set, get) => ({
  pattern: '',
  testString: '',
  flags: {
    global: true,
    caseInsensitive: false,
    multiline: false,
    dotall: false,
    unicode: false,
  },
  matches: [],
  error: null,
  explanation: [],
  activeRecipe: null,

  setPattern: (pattern: string) => {
    const state = get();
    const { matches, error } = computeMatches(pattern, state.testString, state.flags);
    const explanation = safeExplain(pattern);
    set({ pattern, matches, error, explanation });
  },

  setTestString: (testString: string) => {
    const state = get();
    const { matches, error } = computeMatches(state.pattern, testString, state.flags);
    set({ testString, matches, error });
  },

  toggleFlag: (flag: keyof RegexFlags) => {
    const state = get();
    const newFlags: RegexFlags = {
      global: state.flags.global,
      caseInsensitive: state.flags.caseInsensitive,
      multiline: state.flags.multiline,
      dotall: state.flags.dotall,
      unicode: state.flags.unicode,
    };
    
    // Toggle the specific flag
    newFlags[flag] = !state.flags[flag];
    
    // Recompute matches with new flags
    const { matches, error } = computeMatches(state.pattern, state.testString, newFlags);
    
    set({ flags: newFlags, matches, error });
  },

  setFlags: (partialFlags: Partial<RegexFlags>) => {
    const state = get();
    const newFlags: RegexFlags = { ...state.flags, ...partialFlags };
    const { matches, error } = computeMatches(state.pattern, state.testString, newFlags);
    set({ flags: newFlags, matches, error });
  },

  loadRecipe: (recipe: Recipe) => {
    const flags = stringToFlags(recipe.defaultFlags);
    const { matches, error } = computeMatches(recipe.pattern, recipe.sampleTestString, flags);
    const explanation = safeExplain(recipe.pattern);
    set({
      pattern: recipe.pattern,
      testString: recipe.sampleTestString,
      flags,
      matches,
      error,
      explanation,
      activeRecipe: recipe,
    });
  },

  clear: () => {
    set({
      pattern: '',
      testString: '',
      flags: {
        global: true,
        caseInsensitive: false,
        multiline: false,
        dotall: false,
        unicode: false,
      },
      matches: [],
      error: null,
      explanation: [],
      activeRecipe: null,
    });
  },
}));