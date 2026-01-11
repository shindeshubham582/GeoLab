import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["node_modules", "dist", "build"]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
        "react/react-in-jsx-scope": "off",
        "no-multi-spaces": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": ["error", "always"],
        "space-infix-ops": "error",
        "keyword-spacing": ["error", { "before": true, "after": true }]
    }
  }
];
