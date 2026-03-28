# 🧪 Regex Recipes

**A use-case-first regex tool.** Pick what you want to match, get the working pattern and ready-to-use code.

Unlike regex101 which gives you an empty input and expects you to already know regex syntax, Regex Recipes starts from what you're trying to accomplish and provides tested patterns with full documentation.

🔗 **[Live Demo](https://regex-recipes.vercel.app)** 

---

## ✨ Features

### 🎯 **30+ Ready-to-Use Patterns**
Pre-built, tested regex patterns organized by real-world use cases:
- **Validation** - Email, URL, Phone, IP Address, Credit Card, UUID, etc.
- **Extraction** - Numbers, Hashtags, @Mentions, URLs, Prices, File Extensions
- **Formatting** - Dates (ISO, US), Time (24h, 12h AM/PM), ZIP Codes
- **Parsing** - Markdown Links, Headers, Query Strings, CSV, JSON, Log Timestamps
- **Security** - Password Strength, JWT Tokens

### 💻 **Multi-Language Code Snippets**
Every pattern includes copy-paste ready code in:
- JavaScript (ES6+)
- Python 3
- Go
- PHP
- Java

No more translating regex syntax between languages — just copy and use.

### 📊 **Honest Edge Case Documentation**
Each recipe shows:
- ✅ What it **matches** (with examples)
- ❌ What it **doesn't match** (with explanations)

Real documentation that tells you the limitations, not just the happy path.

### 🔍 **Live Pattern Testing**
- Real-time match highlighting with color-coded results
- Pattern explanation engine that breaks down each token
- Toggle regex flags (global, case-insensitive, multiline, etc.)
- Instant feedback as you edit patterns or test strings

### 🎨 **Beautiful, Accessible Design**
- Clean, minimal interface inspired by Linear and Stripe
- Dark mode with perfect contrast ratios (WCAG AA compliant)
- Fully keyboard accessible
- Responsive design (mobile, tablet, desktop)

### 🔗 **Share & Save**
- Shareable URLs for both recipes and custom patterns
- Local history of your recent patterns
- One-click copy for patterns and code snippets

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/rehan-devs/regex-recipes.git
cd regex-recipes

# Install dependencies
npm install

# Start development server
npm run dev

📦 Build for Production

# Create optimized production build
npm run build

# Preview production build locally
npm run preview

The dist/ folder will contain your production-ready static files.

🛠️ Tech Stack

Technology	Purpose
React 18	UI framework
TypeScript	Type safety
Vite	Build tool & dev server
Tailwind CSS	Utility-first styling
Zustand	Lightweight state management
React Router v6	Client-side routing
Lucide React	Icon library

📂 Project Structure

regex-recipes/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # Button, Card, Badge, Toast, etc.
│   │   ├── recipes/         # Recipe grid, detail, search
│   │   ├── playground/      # Pattern tester components
│   │   └── snippets/        # Code block display
│   ├── pages/
│   │   ├── RecipesPage.tsx
│   │   ├── RecipeDetailPage.tsx
│   │   └── PlaygroundPage.tsx
│   ├── data/
│   │   └── recipes.ts       # All 30+ regex recipes
│   ├── stores/
│   │   ├── regexStore.ts    # Pattern matching state
│   │   ├── themeStore.ts    # Light/dark mode
│   │   └── historyStore.ts  # Local history
│   ├── utils/
│   │   └── regexExplainer.ts # Pattern tokenizer
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

🎨 Design Philosophy

What This Is NOT
❌ Futuristic cyber/neon aesthetics
❌ Excessive gradients and glassmorphism
❌ Over-animated "tech bro" UI
❌ Generic landing page templates

What This IS
✅ Clean, purposeful design (Linear.app meets Stripe docs)
✅ Proper whitespace and breathing room
✅ Subtle shadows and micro-interactions
✅ Design that gets out of the way and lets the tool shine

Color Palette:

Light mode: Warm whites (#FAFAFA), soft grays, orange accent (#F97316)
Dark mode: True darks (#0A0A0A), subtle borders (#262626)
One accent color used sparingly for CTAs and highlights
Typography:

UI text: Inter
Code/patterns: JetBrains Mono

🧩 How It Works

Flow 1: Find a Recipe (Primary Use Case)
Land on homepage → see categorized recipe grid
Search or browse by category (Validation, Extraction, etc.)
Click a recipe → pattern auto-fills with sample data
See live matches, explanation, and edge cases
Copy pattern or code snippet in your language
Flow 2: Test Your Own Pattern
Click "Playground" tab
Enter your regex pattern
Paste test string
See matches highlighted in real-time
Get pattern explanation and share URL
Flow 3: Modify a Recipe
Start from any recipe
Edit the pattern or test string
See results update live
Copy modified version

📚 Example Recipes

Recipe	Pattern	Use Case
Email Address	[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}	Validate standard emails
URL	https?://[^\s]+	Extract HTTP/HTTPS links
Phone (US)	\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}	Match US phone formats
Hex Color	#(?:[0-9a-fA-F]{3}){1,2}\b	CSS color codes
IPv4	`\b(?:(?:25[0-5]	2[0-4]\d
Date (ISO)	`\d{4}-(?:0[1-9]	1[0-2])-(?:0[1-9]
Markdown Links	\[([^\]]+)\]\(([^)]+)\)	Parse [text](url) syntax
JWT Token	eyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+	Security tokens
And 22+ more...

🤝 Contributing

Contributions are welcome! Here's how you can help:

Add new recipes - Submit patterns for common use cases
Improve explanations - Make token explanations clearer
Fix bugs - Report issues or submit PRs
Add features - Suggest improvements

Adding a New Recipe
Edit src/data/recipes.ts and add your recipe following this structure:

TypeScript

{
  slug: 'your-recipe-name',
  name: 'Display Name',
  icon: '📝',
  category: 'validation', // or extraction, formatting, parsing, security
  description: 'Short one-line description',
  pattern: 'your-regex-pattern-here',
  defaultFlags: 'g',
  sampleTestString: 'Sample text with examples\nThat should match',
  edgeCases: [
    { input: 'valid-input', shouldMatch: true, explanation: 'Why it matches' },
    { input: 'invalid', shouldMatch: false, explanation: 'Why it fails' },
  ],
  codeSnippets: {
    javascript: '/* your JS code */',
    python: '# your Python code',
    go: '// your Go code',
    php: '<?php /* your PHP code */',
    java: '// your Java code',
  },
  tags: ['keyword1', 'keyword2'],
  difficulty: 'beginner', // or intermediate, advanced
}

📝 License
MIT License - feel free to use this project for anything.

🙏 Acknowledgments
Inspired by the simplicity of regex101 but designed for use-case-first learning
Color palette inspired by Linear.app and Stripe documentation
Built with modern web technologies for performance and accessibility

📧 Contact

Created by Rehan

GitHub: @rehan-devs
Website: https://rehandevs.vercel.app/

⭐ If you find this useful, please star the repo!

🗺️ Roadmap

 Add "Generate from Examples" feature (AI-powered pattern generation)
 Export recipes as JSON/YAML
 User accounts to save favorite recipes
 Community-submitted recipe marketplace
 Browser extension for quick access
 VS Code extension
 More language snippets (Rust, Ruby, C#, etc.)
 Regex debugger with step-through visualization
 Performance benchmarking tool
 Unit test generator from patterns

<p align="center">Made with ❤️ and regex</p>