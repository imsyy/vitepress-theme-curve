module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:vue/vue3-essential"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    // 使用双引号
    quotes: ["warn", "double"],
    // 导入后缀名
    "import/extensions": "off",
    // 禁用 console
    "no-console": "off",
  },
};
