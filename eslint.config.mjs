import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },

  {
    // plugins
    plugins: {
      '@stylistic/js': stylisticJs
    },

    // rules
    rules: {
      '@stylistic/js/indent': ['error', 2],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    },

    // ignores
    ignores: ["dist"]
  },

];