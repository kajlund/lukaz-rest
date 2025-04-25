import express from "express";
import httpLogger from "pino-http";

import { NotFoundError } from "./errors.js";
import { errorHandler } from "./middleware/error-handler.js";

export function getApplication(options) {
  const { cnf, log, db } = options;
  const app = express();
  const router = express.Router();

  const addGroups = (groups, prefix = "") => {
    groups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
        router[method](prefix + group.prefix + path, [...(group.middleware || []), ...middleware], handler);
      });
    });
  };

  return {
    app,
    connectDB: async () => {
      await db.connect();
    },
    disconnectDB: async () => {
      await db.disconnect();
    },
    attachRoutes: (routes) => {
      // Attach routes
      addGroups(routes);
      app.use(router);
      // Add 404 handler
      app.use((req, _res, next) => {
        next(new NotFoundError(`Route ${req.originalUrl} was not found`));
      });
      // Add Generic Error handler
      app.use(errorHandler);
    },
    setupMiddleware: () => {
      app.disable("x-powered-by");
      app.use(express.json());
      if (cnf.LOG_HTTP) {
        app.use(httpLogger({ logger: log }));
      }
    },
  };
}
