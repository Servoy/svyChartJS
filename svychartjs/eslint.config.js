const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const onlyWarn = require('eslint-plugin-only-warn');

module.exports = tseslint.config(
  {
    plugins: { 'only-warn': onlyWarn }
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-selector': ['warn', { type: 'attribute', prefix: 'lib', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['warn', { type: 'element', prefix: 'svychartjs', style: 'kebab-case' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'max-len': ['warn', { code: 200 }],
      'quotes': ['warn', 'single', { allowTemplateLiterals: true }]
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ]
  }
);
