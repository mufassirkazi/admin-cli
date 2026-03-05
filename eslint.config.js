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

      "no-restricted-syntax": [
        "error",

        {
          // require("module")
          selector: "CallExpression[callee.name='require']",
          message:
            "CommonJS require() is not allowed. Use ES module imports instead. Example: import x from 'module';",
        },

        {
          // module.exports = ... or module.exports.foo = ...
          selector:
            "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
          message:
            "CommonJS module.exports is not allowed. Use ES module export syntax instead. Example: export function foo() {}",
        },

        {
          // exports.foo = ...
          selector:
            "AssignmentExpression[left.object.name='exports']",
          message:
            "CommonJS exports.* is not allowed. Use ES module export syntax instead. Example: export const foo = ...",
        },
      ],
    },
  },

  {
    // Ignore compiled output and scripts
    ignores: ["dist/**", "node_modules/**", "scripts/**"],
  }
);