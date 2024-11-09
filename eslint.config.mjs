import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/sites/**', '**/misc/**', '**/assets/**', 'public/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

    }
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    }
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
]
