const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Root": path.resolve(__dirname, "src/"),
      "@Components": path.resolve(__dirname, "src/components"),
    },
  },
};
