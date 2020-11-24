module.exports = {
  extends: ["react-app", "eslint:recommended"],
  "rules": {
    
  },
  overrides: [
    {
      "files": ["**/*.ts?(x)"],
      "rules": {
        "additional-typescript-only-rule": "warn",
      }
    }
  ]
}