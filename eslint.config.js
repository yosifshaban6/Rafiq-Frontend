import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier,
    },
    rules: {
      // formatting
      indent: "off",
      quotes: "off",
      semi: ["error", "always"],
      "no-trailing-spaces": "off",
      "object-curly-spacing": "off",
      "arrow-spacing": "off",
      "arrow-parens": "off",

      // best practices
      "no-console": "off",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "off",
      eqeqeq: ["error", "always"],

      // import
      "import/no-unresolved": "error",
      "import/prefer-default-export": "off",

      // react
      "react/prop-types": "off",
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx"] }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": [
        "error",
        { namedComponents: "function-declaration" },
      ],

      // react hooks
      ...reactHooks.configs.recommended.rules,

      // prettier
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

