module.exports = {
  rules: {
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/consistent-type-definitions": "off",
    "import/order": 0,
    "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "react/function-component-definition": "off",
    "import/no-default-export": "off",
    "no-implicit-coercion": "off",
    "no-sequences": "off",
    "no-nested-ternary": "off",
    // Re-enable this rule when @vercel/style-guide v7 is released
    // More info: https://github.com/vercel/style-guide/issues/105
    "@typescript-eslint/restrict-template-expressions": "off",
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          "JSXElement[openingElement.name.name='IconButton']:not(:has(JSXAttribute[name.name='tooltip']))",
        message: "You should add a tooltip to the IconButton unless it's self-explanatory.",
      },
    ],
  },
  plugins: ["simple-import-sort"],
};
