import http from "node:http";
import util from "node:util";

import { getConfig } from "./config.js";
import { getLogger } from "./logger.js";
import { getDB } from "./db.js";
import { getApplication } from "./app.js";
import { authUtil } from "./utils/auth.js";

import { getActivityServices } from "./api/activities/activity.service.js";
import { getResourceServices } from "./api/resources/resource.service.js";
import { getUserServices } from "./api/users/user.service.js";
import { getActivityHandler } from "./api/activities/activity.handler.js";
import { getResourceHandler } from "./api/resources/resource.handler.js";
import { getUserHandler } from "./api/users/user.handler.js";
import { getRootRoutes } from "./api/root.routes.js";
import { getActivityRoutes } from "./api/activities/activity.routes.js";
import { getResourceRoutes } from "./api/resources/resource.routes.js";
import { getUserRoutes } from "./api/users/user.routes.js";

const cnf = getConfig();
const log = getLogger(cnf);
const db = getDB(cnf, log);
const authUtils = authUtil({ cnf, log });

// Initialize services
const svcActivity = getActivityServices({ log });
const svcResource = getResourceServices({ log });
const svcUser = getUserServices({ cnf, log, authUtils });
// Initialize handlers
const hndActivities = getActivityHandler({ svcActivity });
const hndResources = getResourceHandler({ svcResource });
const hndUsers = getUserHandler({ svcUser });
// Initialize routes
const rootRoutes = getRootRoutes();
const activityRoutes = getActivityRoutes({ hnd: hndActivities });
const resourceRoutes = getResourceRoutes({ hnd: hndResources });
const userRoutes = getUserRoutes({ hnd: hndUsers });

const application = getApplication({ cnf, log, db });

process.on("SIGINT", async () => {
  log.info("SIGINT signal received: closing HTTP server");
  await application.disconnectDB();
  log.info("Database connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  log.info("SIGTERM signal received: closing HTTP server");
  await application.disconnectDB();
  log.info("Database connection closed");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  log.fatal(`UNCAUGHT EXCEPTION - ${err.stack || err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
  log.fatal(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`);
  process.exit(1);
});

log.info("Starting server...");
log.info(`Environment: ${cnf.NODE_ENV}`);

application.setupMiddleware();
application.attachRoutes([rootRoutes, activityRoutes, resourceRoutes, userRoutes]);
await application.connectDB();

const server = http.createServer(application.app).listen(cnf.PORT, () => {
  log.info(`HTTP server running on port ${cnf.PORT}`);
});

export default server;
