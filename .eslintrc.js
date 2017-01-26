module.exports = {
  "ecmaFeatures": {
    "classes": true,
    "jsx": true,
  },
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "google", "standard-react",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "plugins": [
    "react", "import",
  ],
  "rules": {
    "max-len": ["error", 150],
    "no-unused-vars": "warn",
    "react/jsx-no-bind": "off",
    "spaced-comment": "off"
  },
  "settings": {
  }
};
