const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Root": path.resolve(__dirname, "src/"),
      "@Views": path.resolve(__dirname, "src/views/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
      "@Services": path.resolve(__dirname, "src/services/"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Display": path.resolve(__dirname, "src/components/Display/"),
      "@Controls": path.resolve(__dirname, "src/components/Controls/")
    }
  }
};
