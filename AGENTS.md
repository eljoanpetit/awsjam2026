# AGENTS.md

This file serves as the definitive reference for autonomous coding agents (like Cursor, Copilot, or standard LLMs) operating in the `004-web-aws-jam` repository. It outlines the architecture, tooling, and coding conventions to follow to ensure consistency.

## Architecture & Tech Stack

This project is a lightweight, CDN-driven single-page React application.
- **Framework:** React 18 (loaded via unpkg CDN).
- **Transpilation:** In-browser Babel (`@babel/standalone`) translates JSX via `<script type="text/babel">` directly inside `index.html`.
- **Styling:** Tailwind CSS (via CDN script) and localized inline custom CSS (`<style>`).
- **Tooling/Bundling:** NO Webpack, Vite, Next.js, or local transpilation step is currently used. 

## Build, Lint, and Test Commands

Because this is a zero-build, CDN-based application, there is no automated pipeline configured by default. Do not attempt to run standard Node.js build commands unless the user requests a migration to a bundler.

### 1. Build Command
No build step is required. To view and test the application, serve the directory locally:
```bash
# Recommended local servers
python3 -m http.server 8000
# or
npx serve .
```

### 2. Linting
There are no automated linters (like ESLint or Prettier) configured. 
- Ensure that any code added matches the formatting of the existing codebase manually.
- **Action for Agents:** Do not run `npm run lint`. Validate syntax visually and ensure JS syntax is ES6+ compliant.

### 3. Testing
Testing is currently performed via manual visual inspection in the browser. 
- **Running a single test:** Serve the application (`python3 -m http.server`) and manually verify the component functionality or UI state in your browser.
- **Adding Tests:** Do not proactively add complex testing libraries (Jest/Cypress/Vitest) unless explicitly requested. If requested, prefer lightweight configurations.

## Code Style & Guidelines

### 1. File Structure & Scope
- **Primary Logic:** `index.html` contains the core application within `<script type="text/babel">`. When modifying the React app, focus changes within this block.
- **Auxiliary Files:** `app.js` serves as an offline reference or backup. Any functional updates should primarily target `index.html`.

### 2. React Conventions
- **Components:** Use functional components exclusively. Do not use class components.
- **State & Hooks:** Utilize React hooks (`useState`, `useEffect`). Access them via destructuring the global `React` object: 
  ```javascript
  const { useState, useEffect } = React;
  ```
- **Props:** Destructure props directly in the function signature: `const Countdown = ({ targetDate, lang }) => { ... }`.
- **JSX:** Follow standard JSX conventions. Ensure proper closing tags and use camelCase properties for attributes (e.g., `className` instead of `class` inside React blocks).

### 3. Styling & CSS
- **Tailwind First:** Use Tailwind CSS utility classes for styling wherever possible.
- **Custom CSS:** Only use custom CSS within the `<style>` block in the `<head>` of `index.html` for complex animations (like `@keyframes pulse-green`) or specific pseudo-classes that Tailwind via CDN doesn't easily cover.
- **Naming CSS Classes:** Use `kebab-case` for custom CSS classes (e.g., `bg-itic-blue`, `text-itic-green`).

### 4. JavaScript Guidelines
- **Variables:** Prefer `const` over `let`. Avoid `var` entirely.
- **Functions:** Use arrow functions (`() => {}`) for callbacks and standard component definitions.
- **Formatting:** Use 4 spaces for indentation (matching the `index.html` structure).
- **Quotes:** Use double quotes (`"`) for JSX attributes and single quotes (`'`) or double quotes consistently for JavaScript strings.
- **Error Handling:** Use `try/catch` blocks for asynchronous operations or data parsing. Ensure console logging is meaningful for debugging but remove excessive `console.log` statements before finalizing a task.
- **Naming Conventions:**
  - **Variables/Functions:** `camelCase` (e.g., `timeLeft`, `calculate`)
  - **Components:** `PascalCase` (e.g., `Countdown`, `App`)
  - **Constants:** `UPPER_SNAKE_CASE` if global/static, `camelCase` otherwise.

### 5. Best Practices & Rules for AI Agents
- **Avoid Over-Engineering:** Do not introduce heavy tooling, Webpack, Vite, or TypeScript unless explicitly instructed by the user. Respect the simplistic CDN-driven architecture.
- **Context Awareness:** When editing `index.html`, be extremely careful to preserve the Babel `<script>` tags and the overarching DOM structure. Do not accidentally overwrite the `<head>` section.
- **Translations:** Maintain the existing dictionary-based translation object (`const translations = { ... }`). If adding a new string, add keys simultaneously to all supported languages (`es`, `ca`, `gl`, `eu`).
- **Imports:** Do not use `import x from 'y'` syntax as this is not a module-based environment; instead, rely on global objects (e.g., `React`, `ReactDOM`) exposed by the CDN scripts.
