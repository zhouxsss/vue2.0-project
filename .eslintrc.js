module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'no-var': 'error',
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-unused-vars': [2, { ignoreRestSiblings: true, argsIgnorePattern: '^h$' }],
    'no-undef': 2,
    camelcase: 'off',
    'no-extra-boolean-cast': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/comment-directive': 'off',
    'vue/prop-name-casing': 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
  globals: {
    h: true,
  },
}
