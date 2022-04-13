const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Root": path.resolve(__dirname, "src/"),
      "@Views": path.resolve(__dirname, "src/views/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
      "@Services": path.resolve(__dirname, "src/services/"),
      "@Hoc": path.resolve(__dirname, "src/components/Hoc/"),
      "@Page": path.resolve(__dirname, "src/components/Page/"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Display": path.resolve(__dirname, "src/components/Display/"),
      "@Controls": path.resolve(__dirname, "src/components/Controls/")
    }
  }
};
