/* eslint-env node */
/**
 * @type { import('@typescript-eslint/utils').TSESLint.Linter.Config }
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
};
