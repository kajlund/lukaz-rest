import express from "express";

import log from "./logger.js";

import activityRoutes from "./api/activities/activity.routes.js";

const rootRoutes = {
  group: {
    prefix: "",
    middleware: [],
  },
  routes: [
    {
      method: "get",
      path: "/ping",
      middleware: [],
      handler: (_req, res) => {
        res.status(200).json({
          success: true,
          message: "Pong",
          status: 200,
          data: null,
        });
      },
    },
  ],
};

class AppRouter {
  constructor(routes) {
    this.router = express.Router();
    this.routes = routes;
    this.#attachRoutes(this.routes, "");
  }

  #attachRoutes(routeGroups, prefix = "") {
    routeGroups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
        this.router[method](prefix + group.prefix + path, [...(group.middleware || []), ...middleware], handler);
      });
    });
  }
}

export default new AppRouter([rootRoutes, activityRoutes]);
