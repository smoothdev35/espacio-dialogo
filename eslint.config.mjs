import path from 'node:path'
import { fileURLToPath } from 'node:url'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['frontend/**/*.{ts,tsx,astro}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: true,
        tsconfigRootDir: path.join(rootDir, 'frontend'),
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'astro/no-set-html-directive': 'off',
    },
  },
  {
    files: ['frontend/**/*.{tsx,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['backend/**/*.{ts,js}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/.cache/',
      '**/.strapi/',
      '**/.astro/',
      '**/coverage/',
      'backend/src/admin/',
      'backend/src/extensions/',
      'backend/src/plugins/',
      'backend/types/generated/',
      '**/*.tsbuildinfo',
    ],
  },
)