---
name: auth-migration
description: Upgrade a Node.js TypeScript service to the org-wide Node 20 + strict ESM standard with CI enforcement and migration reporting.
---

# Node 20 + Pure ESM Org Standard

Upgrade this repository to the organization-wide Node 20 + strict ESM standard.

This includes:

- Node 20 runtime
- Pure ESM ("type": "module")
- NodeNext module resolution
- No CommonJS usage
- CI enforcement
- Docker enforcement
- Migration report artifact

---

## Execution Steps

### 1. Upgrade Runtime

- Update Dockerfile base image to `node:20`
- Update GitHub Actions workflow to use Node 20
- Add to package.json:

```json
"engines": {
  "node": ">=20"
}
```

---

### 2. Enforce Pure ESM

- Add `"type": "module"` to package.json
- Convert all `require()` to `import`
- Convert all `module.exports` to `export`
- Add explicit `.js` extensions to relative imports
- Update tsconfig.json:

```json
{
  "module": "NodeNext",
  "moduleResolution": "NodeNext"
}
```

---

### 3. Add Drift Detection Script

Add to package.json scripts:

```json
"check:esm": "grep -R \"require(\" src && echo '❌ CommonJS detected' && exit 1 || echo '✅ ESM clean'"
```

---

### 4. Enforce in CI

In GitHub Actions workflow, add step:

```yaml
- run: npm run check:esm
```

This must fail CI if CommonJS is detected.

---

### 5. Add Migration Report Generator

Create:

`scripts/generate-migration-report.js`

With contents:

```js
import fs from "fs";

const report = {
  nodeVersion: process.version,
  esm: true,
  timestamp: new Date().toISOString()
};

fs.writeFileSync("migration-report.json", JSON.stringify(report, null, 2));
console.log("Migration report generated.");
```

Add to package.json scripts:

```json
"generate:report": "node scripts/generate-migration-report.js"
```

---

### 6. Validation Checklist

After applying this skill:

- No `require(` remains in src
- No `module.exports` remains
- Docker uses node:20
- CI uses Node 20
- tsconfig uses NodeNext
- Build succeeds
- Tests pass
