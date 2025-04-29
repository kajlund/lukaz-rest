import express from "express";
import httpLogger from "pino-http";

import { NotFoundError } from "./errors.js";
import { errorHandler } from "./middleware/error-handler.js";
import { getMongoose } from "./db/index.js";
import { getMongoDB } from "./db/connection.js";
import { getRootRoutes } from "./api/root.routes.js";
import { getActivityRoutes } from "./api/activities/activity.routes.js";
import { getProverbRoutes } from "./api/proverbs/proverb.routes.js";
import { getResourceRoutes } from "./api/resources/resource.routes.js";
import { getUserRoutes } from "./api/users/user.routes.js";

export class App {
  constructor(cnf, log) {
    this.cnf = cnf;
    this.log = log;
    this.app = express();
    this.router = express.Router();
    this.db = getMongoose(this.cnf, this.log);
    this.mongo = getMongoDB();
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
    await this.mongo.connect();
  }
  async #disconnectDB() {
    await this.db.disconnect();
    await this.mongo.disconnect();
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

    // Initialize routes
    const rootRoutes = getRootRoutes();
    const activityRoutes = getActivityRoutes();
    const resourceRoutes = getResourceRoutes();
    const userRoutes = getUserRoutes();

    this.#attachRoutes([rootRoutes, activityRoutes, resourceRoutes, userRoutes, getProverbRoutes()]);
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
