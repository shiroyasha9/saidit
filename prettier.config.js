/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  endOfLine: "auto",
};

module.exports = config;
