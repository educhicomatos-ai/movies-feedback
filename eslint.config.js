// Regras básicas de JavaScript, globais do navegador e verificações de React.
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Configura quais arquivos são verificados e quais conjuntos de regras usar.
export default defineConfig([
  // Arquivos de saída do Vite não são analisados pelo ESLint.
  globalIgnores(['dist']),
  {
    // Aplica estas regras aos arquivos JavaScript e JSX.
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
