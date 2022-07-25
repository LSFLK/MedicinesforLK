module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  rules: {
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unstable-nested-components": "off",
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
