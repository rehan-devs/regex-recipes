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
📦 Build for ProductionBash# Create optimized production build
npm run build

# Preview production build locally
npm run preview
The dist/ folder will contain your production-ready static files.🛠️ Tech StackTechnologyPurposeReact 18UI frameworkTypeScriptType safetyViteBuild tool & dev serverTailwind CSSUtility-first stylingZustandLightweight state managementReact Router v6Client-side routingLucide ReactIcon library📂 Project StructurePlaintextregex-recipes/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # Button, Card, Badge, Toast, etc.
│   │   ├── recipes/         # Recipe grid, detail, search
│   │   ├── playground/      # Pattern tester components
│   │   └── snippets/        # Code block display
│   ├── pages/               # Page-level components
│   ├── data/
│   │   └── recipes.ts       # All 30+ regex recipes
│   ├── stores/              # Zustand state stores
│   ├── utils/               # Logic & Pattern tokenizer
│   └── styles/
│       └── globals.css
├── package.json
└── vite.config.ts
🎨 Design PhilosophyWhat This Is NOT❌ Futuristic cyber/neon aesthetics❌ Excessive gradients and glassmorphism❌ Over-animated "tech bro" UI❌ Generic landing page templatesWhat This IS✅ Clean, purposeful design (Linear.app meets Stripe docs)✅ Proper whitespace and breathing room✅ Subtle shadows and micro-interactions✅ Design that gets out of the wayColor Palette:Light mode: Warm whites (#FAFAFA), soft grays, orange accent (#F97316)Dark mode: True darks (#0A0A0A), subtle borders (#262626)📚 Example RecipesRecipePatternUse CaseEmail Address[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}Standard validationURLhttps?://[^\s]+Extract HTTP/HTTPS linksHex Color#(?:[0-9a-fA-F]{3}){1,2}\bCSS color codesJWT TokeneyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+Security tokens🤝 ContributingContributions are welcome! Edit src/data/recipes.ts to add new recipes:TypeScript{
  slug: 'your-recipe-name',
  name: 'Display Name',
  icon: '📝',
  category: 'validation',
  pattern: 'your-regex-pattern-here',
  // ... check recipes.ts for full schema
}
📧 ContactCreated by Rehan GitHub | Website⭐ If you find this useful, please star the repo!🗺️ Roadmap[ ] Generate from Examples – AI-powered pattern generation[ ] Export Options – Download recipes as JSON/YAML[ ] User Accounts – Save and sync favorite recipes[ ] Community Marketplace – User-submitted recipe gallery[ ] Browser Extension – Quick access from any tab[ ] VS Code Extension – Integration directly in your editor[ ] Regex Debugger – Step-through pattern visualization<br /><p align="center">Made with ❤️ and <b>regex</b></p>