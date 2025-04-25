import pino from "pino";

import { getConfig } from "./config.js";

const cnf = getConfig();

const logConfig = {
  level: cnf.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
};

if (!cnf.isProd) {
  logConfig.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  };
}

class Logger {
  constructor(cnf) {
    this.log = pino(cnf);
    this.log.debug(`Logger configured. Level: ${cnf.LOG_LEVEL}`);
  }
}

const logger = new Logger(logConfig);

export default logger.log;
