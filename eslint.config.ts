import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },

  {
    files: ['eslint.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ['**/__tests__/**/*.js', '**/*.test.js'],
    rules: {
      'no-undef': 'off',
    },
  },
];
