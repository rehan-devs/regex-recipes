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

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/rehan-devs/regex-recipes.git
cd regex-recipes

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The `dist/` folder will contain your production-ready static files.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Zustand | Lightweight state management |
| React Router v6 | Client-side routing |
| Lucide React | Icon library |

---

## 📂 Project Structure

```plaintext
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
│   ├── pages/               # Page-level components
│   ├── data/
│   │   └── recipes.ts       # All 30+ regex recipes
│   ├── stores/              # Zustand state stores
│   ├── utils/               # Logic & Pattern tokenizer
│   └── styles/
│       └── globals.css
├── package.json
└── vite.config.ts
```

---

## 🎨 Design Philosophy

### What This Is NOT

- ❌ Futuristic cyber/neon aesthetics
- ❌ Excessive gradients and glassmorphism
- ❌ Over-animated "tech bro" UI
- ❌ Generic landing page templates

### What This IS

- ✅ Clean, purposeful design (Linear.app meets Stripe docs)
- ✅ Proper whitespace and breathing room
- ✅ Subtle shadows and micro-interactions
- ✅ Design that gets out of the way

**Color Palette:**

- **Light mode:** Warm whites (`#FAFAFA`), soft grays, orange accent (`#F97316`)
- **Dark mode:** True darks (`#0A0A0A`), subtle borders (`#262626`)

---

## 📚 Example Recipes

| Recipe | Pattern | Use Case |
|---|---|---|
| Email Address | `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}` | Standard validation |
| URL | `https?://[^\s]+` | Extract HTTP/HTTPS links |
| Hex Color | `#(?:[0-9a-fA-F]{3}){1,2}\b` | CSS color codes |
| JWT Token | `eyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+` | Security tokens |

---

## 🤝 Contributing

Contributions are welcome! Edit `src/data/recipes.ts` to add new recipes:

```typescript
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
```

---

## 📧 Contact

Created by **Rehan** — [GitHub](https://github.com/rehan-devs) | [Website](https://rehandevs.vercel.app/)

⭐ **If you find this useful, please star the repo!**

---

## 🗺️ Roadmap

- [ ] Generate from Examples – AI-powered pattern generation
- [ ] Export Options – Download recipes as JSON/YAML
- [ ] User Accounts – Save and sync favorite recipes
- [ ] Community Marketplace – User-submitted recipe gallery
- [ ] Browser Extension – Quick access from any tab
- [ ] VS Code Extension – Integration directly in your editor
- [ ] Regex Debugger – Step-through pattern visualization

---

<p align="center">Made with ❤️ and <b>regex</b></p>
<!-- gitpulse:contribution index="1" timestamp="2026-05-10" -->
<!-- gitpulse:contribution index="2" timestamp="2026-05-10" -->