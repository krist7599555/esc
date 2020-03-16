module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix':         ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any':               ['off'],
    '@typescript-eslint/camelcase':                     ['off'],
    'indent':             ['error', 2],
    'semi':               ['error', 'always'],
    'quotes':             ['error', 'single'],
    'comma-dangle':       ['error', 'always-multiline'],
    'comma-spacing':      ['error', { before: false, after: true }],
    'quote-props':        ['error', 'consistent'],
    'no-trailing-spaces': ['error'],
    'key-spacing':        ['error', {
      multiLine: {
        afterColon:  true,
        beforeColon: false,
      },
      align: {
        on:          'value',
        afterColon:  true,
        beforeColon: false,
      },
    }],
    // 'sort-imports': ['error', {
    //   'ignoreCase': false,
    //   'ignoreDeclarationSort': false,
    //   'ignoreMemberSort': false,
    //   'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    // }]
  },
};
