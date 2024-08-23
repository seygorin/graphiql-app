module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import", "prettier"],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    "prettier/prettier": "error",
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'no-bitwise': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'no-restricted-exports': 'off',
    // 'import/prefer-default-export': 'off',
    // "@typescript-eslint/no-explicit-any": "error", // by default
    // "no-undef": "error", // add if necessary
    // "@typescript-eslint/no-unused-vars": "off", // add if necessary
    // "no-unused-vars": "off", // add if necessary
  },
};



