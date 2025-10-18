module.exports = {
  extends: ['../../.eslintrc.js'],
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    // CLI specific rules
    'no-console': 'off', // Allow console.log in CLI
    'no-process-exit': 'off', // Allow process.exit in CLI

    // TypeScript rules for CLI
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Async/await rules
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
