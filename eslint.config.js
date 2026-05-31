const js = require('@eslint/js')
const vue = require('eslint-plugin-vue')
const globals = require('globals')

module.exports = [
  {
    ignores: ['dist/**', 'examples/dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['src/**/*.{js,vue}', 'examples/**/*.{js,vue}', '*.config.js', '*.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024
      }
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
      'no-useless-assignment': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      'vue/no-required-prop-with-default': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/no-use-v-if-with-v-for': 'warn',
      'vue/require-toggle-inside-transition': 'warn',
      'vue/require-v-for-key': 'warn',
      'vue/valid-v-for': 'warn',
      'vue/v-on-event-hyphenation': 'off'
    }
  },
  {
    files: ['src/**/*.{js,vue}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  }
]
