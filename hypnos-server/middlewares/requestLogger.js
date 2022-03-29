const chalk = require("chalk");
const { info } = require("@utils/logger");

const getRequestDuration = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const requestLogger = (req, res, next) => {
  const date = new Date();
  const formattedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  const { method, url } = req;
  const { statusCode } = res;

  const durationInMilliseconds = getRequestDuration(process.hrtime());
  const log = `[${chalk.blue(
    formattedDate
  )}] ${method}:${url} ${statusCode} ${chalk.red(
    durationInMilliseconds.toLocaleString() + "ms"
  )}`;

  info(log);
  next();
};

module.exports = requestLogger;
