import express from "express";
import httpLogger from "pino-http";

import { NotFoundError } from "./errors.js";
import { errorHandler } from "./middleware/error-handler.js";
import { getDB } from "./db.js";
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

export class App {
  constructor(cnf, log) {
    this.cnf = cnf;
    this.log = log;
    this.app = express();
    this.router = express.Router();
    this.db = getDB(this.cnf, this.log);
  }

  #addGroups(groups, prefix = "") {
    groups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        this.log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
        this.router[method](prefix + group.prefix + path, [...(group.middleware || []), ...middleware], handler);
      });
    });
  }

  async #connectDB() {
    await this.db.connect();
  }
  async #disconnectDB() {
    await this.db.disconnect();
  }

  #setupMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    if (this.cnf.LOG_HTTP) {
      this.app.use(httpLogger({ logger: this.log }));
    }
  }

  #attachRoutes(routes) {
    this.#addGroups(routes);
    this.app.use(this.router);
    // Add 404 handler
    this.app.use((req, _res, next) => {
      next(new NotFoundError(`Route ${req.originalUrl} was not found`));
    });

    // Add Generic Error handler
    this.app.use(errorHandler);
  }

  initialize() {
    this.#setupMiddleware();

    const authUtils = authUtil({ cnf: this.cnf, log: this.log });
    // Initialize services
    const svcActivity = getActivityServices({ log: this.log });
    const svcResource = getResourceServices({ log: this.log });
    const svcUser = getUserServices({ cnf: this.cnf, log: this.log, authUtils });

    // Initialize handlers
    const hndActivities = getActivityHandler({ svcActivity });
    const hndResources = getResourceHandler({ svcResource });
    const hndUsers = getUserHandler({ svcUser });
    // Initialize routes

    const rootRoutes = getRootRoutes();
    const activityRoutes = getActivityRoutes({ hnd: hndActivities });
    const resourceRoutes = getResourceRoutes({ hnd: hndResources });
    const userRoutes = getUserRoutes({ hnd: hndUsers });

    this.#attachRoutes([rootRoutes, activityRoutes, resourceRoutes, userRoutes]);
  }

  async start() {
    this.log.info(`Environment: ${this.cnf.NODE_ENV}`);
    this.log.info("Starting server...");
    await this.#connectDB();
    this.app.listen(this.cnf.PORT, () => {
      this.log.info(`Server running on port ${this.cnf.PORT}`);
    });
  }

  async stop() {
    await this.#disconnectDB();
    this.log.info("Server stopped");
  }
}

export class AppBuilder {
  #cnf;
  #log;

  withConfig(cnf) {
    this.#cnf = cnf;
    return this;
  }

  withLogger(log) {
    this.#log = log;
    return this;
  }

  build() {
    return new App(this.#cnf, this.#log);
  }
}
