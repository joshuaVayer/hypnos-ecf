const chalk = require("chalk");

module.exports = {
  info: (...params) =>
    console.log(...params),
  error: (...params) =>
    console.error(chalk.red(`[${new Date().toISOString()}]`, ...params))
};
