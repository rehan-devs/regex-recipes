export type Category = 'validation' | 'extraction' | 'formatting' | 'parsing' | 'security';

export type Language = 'javascript' | 'python' | 'go' | 'php' | 'java';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface EdgeCase {
  input: string;
  shouldMatch: boolean;
  explanation: string;
}

export interface Recipe {
  slug: string;
  name: string;
  icon: string;
  category: Category;
  description: string;
  pattern: string;
  defaultFlags: string;
  sampleTestString: string;
  edgeCases: EdgeCase[];
  codeSnippets: Record<Language, string>;
  tags: string[];
  difficulty: Difficulty;
}

export interface MatchResult {
  text: string;
  index: number;
  length: number;
  groups?: Record<string, string>;
  groupIndex: number;
}

export interface ExplanationToken {
  token: string;
  explanation: string;
  startIndex: number;
  endIndex: number;
}

export interface RegexFlags {
  global: boolean;
  caseInsensitive: boolean;
  multiline: boolean;
  dotall: boolean;
  unicode: boolean;
}

export interface HistoryItem {
  id: string;
  pattern: string;
  flags: string;
  testString: string;
  timestamp: number;
  matchCount: number;
  source: 'recipe' | 'playground';
  recipeName?: string;
}