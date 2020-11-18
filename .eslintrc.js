module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [ // Recommended Rule Defaults
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "react-app",
    "react-app/jest",
  ],
  rules: { // Custom Rules
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": "error",
    "brace-style": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": "error",
    "computed-property-spacing": "error",
    "default-case": "error",
    "eqeqeq": "error",
    "implicit-arrow-linebreak": "error",
    "indent": ["warn", 2],
    "jsx-quotes": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "max-classes-per-file": "error",
    "no-alert": "error",
//    "no-console": "error",
    "no-constructor-return": "error",
    "no-else-return": "error",
    "no-extra-bind": "error",
    "no-implicit-globals": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-nested-ternary": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "warn",
    "no-unused-expressions": "error",
    "no-useless-concat": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-object-spread": "error",
    "quotes": "warn",
    "semi": "warn",
    "semi-spacing": "error",
    "sort-vars": "error",
    "spaced-comment": "error",
  },
};
