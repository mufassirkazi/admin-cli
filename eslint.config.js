import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules applied to TS files
  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // ── Enforce pure ESM ──────────────────────────────────────────────────

      // Disallow require() calls (CJS imports)
      "@typescript-eslint/no-require-imports": "error",

      // Disallow module.exports and exports.* assignments
      "no-restricted-syntax": [
        "error",
        {
          // module.exports = ...  or  module.exports.foo = ...
          selector:
            "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
          message:
            "CommonJS `module.exports` is not allowed. Use ESM `export` instead.",
        },
        {
          // exports.foo = ...
          selector:
            "AssignmentExpression[left.object.name='exports']",
          message:
            "CommonJS `exports.*` is not allowed. Use ESM `export` instead.",
        },
      ],
    },
  },

  {
    // Ignore compiled output and config scripts that are not part of the src
    ignores: ["dist/**", "node_modules/**", "scripts/**"],
  },
);
