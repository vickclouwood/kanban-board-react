module.exports = {
  webpack: {
    configure: {
      target: "electron-renderer",
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  eslint: {
    enable: false,
  },
};
