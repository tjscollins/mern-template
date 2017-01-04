module.exports = {
  "extends": [
    "google", "standard-react",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "max-len": "off",
    "no-unused-vars": "warn",
    "spaced-comment": "off",
  }
};
