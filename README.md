# admin-cli

> Built with [Pochi](https://getpochi.com) — an AI software engineer that writes, refactors, and ships code autonomously.

A Node.js command-line tool for admin operations including syncing, deploying, and environment reporting. This project serves as a reference implementation demonstrating a **Node 20 + strict ESM** TypeScript setup with full CI enforcement.

---

## What this project achieves

### 1. Node 20 + Strict ESM
The codebase is fully migrated to [ECMAScript Modules](https://nodejs.org/api/esm.html):
- `"type": "module"` in `package.json` — no CJS fallback
- TypeScript compiled with `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`
- All imports use explicit `.js` extensions as required by the Node ESM spec

### 2. ESLint enforcement of ESM
An ESLint config (`eslint.config.js`) using the modern flat config format actively **blocks CommonJS** from being introduced:
- `@typescript-eslint/no-require-imports` — errors on any `require()` call
- `no-restricted-syntax` — errors on `module.exports` and `exports.*` assignments

### 3. CI pipeline
GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request to `main`:

```
Lint → Check ESM compliance → Build → Test → Generate migration report
```

Every step must pass before a PR can be merged.

---

## Project structure

```
src/
├── cli.ts                  # Entrypoint — runs the sync command
├── commands/
│   ├── sync.ts             # sync() — logs and returns sync status
│   ├── deploy.ts           # deploy() — returns deployment status
│   └── legacy-report.ts    # legacyReport() — returns current OS platform
├── config/
│   └── loader.ts           # loadConfig() — reads and parses a JSON config file
└── utils/
    └── logger.ts           # log() — prefixed console output
```

---

## Getting started

**Requirements:** Node.js >= 20

```bash
# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

---

## Scripts

| Script | Description |
|---|---|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled CLI |
| `npm run dev` | Run directly from source via ts-node |
| `npm run lint` | ESLint — fails if any CommonJS is detected |
| `npm test` | Run Jest test suite |
| `npm run check:esm` | Grep-based CommonJS check (belt-and-suspenders) |
| `npm run generate:report` | Generate a JSON migration report |

---

## Tech stack

| Tool | Version | Role |
|---|---|---|
| Node.js | ≥ 20 | Runtime |
| TypeScript | ^5.3 | Language |
| ESLint | ^10 | Linting + CJS enforcement |
| typescript-eslint | ^8 | TypeScript-aware lint rules |
| Jest + ts-jest | ^29 | Testing |

---

*This project was created and migrated to Node 20 strict ESM entirely using [Pochi](https://getpochi.com).*
