import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
        document: true,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier,
    },
    rules: {
      // Formatting (handled by Prettier)
      indent: "off",
      quotes: "off",
      semi: ["error", "always"],
      "no-trailing-spaces": "off",
      "object-curly-spacing": "off",
      "arrow-spacing": "off",
      "arrow-parens": "off",

      // JavaScript best practices
      "no-console": "off",
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-unused-vars": ["off"],
      eqeqeq: ["error", "always"],

      // Import rules
      "import/no-unresolved": ["error"],
      "import/prefer-default-export": "off",

      // React rules
      "react/prop-types": "off",
      "react/jsx-filename-extension": [1, { extensions: [".jsx"] }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": [
        "error",
        { namedComponents: "function-declaration" },
      ],

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Prettier
      "prettier/prettier": ["error", { arrowParens: "always" }],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/", "coverage/"],
  },
];
