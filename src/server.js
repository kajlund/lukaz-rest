import http from "node:http";
import util from "node:util";

import cnf from "./config.js";
import expressApp from "./app.js";
import log from "./logger.js";

log.info("Starting server...");
log.info(`Environment: ${cnf.NODE_ENV}`);

process.on("uncaughtException", (err) => {
  log.fatal(`UNCAUGHT EXCEPTION - ${err.stack || err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
  log.fatal(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`);
  process.exit(1);
});

await expressApp.initialize();
const server = http.createServer(expressApp.app).listen(cnf.PORT, () => {
  log.info(`HTTP server running on port ${cnf.PORT}`);
});

export default server;
