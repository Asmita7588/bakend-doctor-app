import winston, { createLogger } from "winston";
import "winston-daily-rotate-file";

const { format, transports } = winston;

/**
 * Logger handles all logs in the application
 */
export const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.File({
      filename: "logs/server/error.log",
      level: "error",
      handleExceptions: true,
    }),
    new transports.File({
      filename: "logs/server/all.log",
      level: "info",
      handleExceptions: true,
    }),
    new transports.DailyRotateFile({
      maxFiles: "14d",
      level: "info",
      dirname: "logs/server/daily",
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%.log",
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
    }),
  ],
});

/**
 * Morgan Logger logs all HTTP requests in a dedicated file and console
 */
const morganLogger = createLogger({
  format: format.combine(format.simple()),
  transports: [
    new transports.File({
      filename: "logs/requests/all.log",
      level: "debug",
      handleExceptions: true,
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
    }),
    new transports.DailyRotateFile({
      maxFiles: "14d",
      level: "info",
      dirname: "logs/requests/daily",
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%.log",
    }),
  ],
});

/**
 * A writable stream for Morgan logger.
 */
 export const logStream = {
  write(message) {
    morganLogger.info(message.toString());
  },
};

