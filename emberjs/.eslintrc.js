'use strict'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018,
    ecmaFeatures: {
      legacyDecorators: true,
    },
    // allowImportExportEverywhere: true,
  },
  plugins: ['ember', "@typescript-eslint"],
  extends: [
    'eslint:recommended',
    'plugin:ember/octane',
    // https://github.com/ember-cli/eslint-plugin-ember
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-jquery': ['error'],
    // '@typescript-eslint/no-var-requires': ['off'],
    // '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    // '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'quote-props': ['error', 'consistent'],
    'no-trailing-spaces': ['error'],
    // 'key-spacing': [
    //   'error',
    //   {
    //     multiLine: { afterColon: true, beforeColon: false },
    //     align: { on: 'value', afterColon: true, beforeColon: false },
    //   },
    // ],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-undef': ['error'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/type-annotation-spacing': ['error']
  },
  // overrides: [
  //   // node files
  //   {
  //     files: [
  //       '.eslintrc.js',
  //       '.template-lintrc.js',
  //       'ember-cli-build.js',
  //       'testem.js',
  //       'blueprints/*/index.js',
  //       'config/**/*.js',
  //       'lib/*/index.js',
  //       'server/**/*.js',
  //     ],
  //     parserOptions: {
  //       sourceType: 'script',
  //     },
  //     env: {
  //       browser: true,
  //       node: true,
  //     },
  //     plugins: ['node'],
  //     rules: Object.assign(
  //       {},
  //       require('eslint-plugin-node').configs.recommended.rules,
  //       {
  //         // add your custom rules and overrides for node files here

  //         // this can be removed once the following is fixed
  //         // https://github.com/mysticatea/eslint-plugin-node/issues/77
  //         'node/no-unpublished-require': 'off',
  //       },
  //     ),
  //   },
  // ],
}
