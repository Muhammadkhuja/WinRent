const winston = require("winston");
const config = require("config");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, colorize, json } =
  format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "rent" }), timestamp(), myFormat, json()),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combine.log", level: "info" }),
  ],
});

logger.exitOnError = false;
logger.exceptions.handle(
  new transports.File({ filename: "log/exceptions.log" })
);
logger.rejections.handle(
  new transports.File({ filename: "log/rejections.log" })
);

module.exports = logger;



// const fs = require("fs");
// const winston = require("winston");
// const config = require("config");
// require("winston-mongodb");

// if (!fs.existsSync("log")) {
//   fs.mkdirSync("log");
// }

// const { createLogger, format, transports } = winston;
// const { combine, timestamp, label, printf, json } = format;

// // Format shablon
// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

// // Logger yaratamiz
// const logger = createLogger({
//   format: combine(label({ label: "winrent" }), timestamp(), myFormat, json()),
//   transports: [
//     new transports.Console({ level: "debug" }),
//     new transports.File({ filename: "log/error.log", level: "error" }),
//     new transports.File({ filename: "log/combine.log", level: "info" }),
//   ],
//   exceptionHandlers: [new transports.File({ filename: "log/exceptions.log" })], // Nisbiy yo'l
//   rejectionHandlers: [new transports.File({ filename: "log/rejections.log" })], // Nisbiy yo'l
// });

// logger.exitOnError = false;

// module.exports = logger;

