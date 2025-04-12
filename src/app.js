import express from "express";

import cnf from "./config.js";
import db from "./db.js";
import router from "./router.js";

class ExpressApp {
  constructor(cnf, db, appRouter) {
    this.cnf = cnf;
    this.db = db;
    this.app = express();
    this.appRouter = appRouter;
  }

  #setupMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
  }

  async initialize() {
    await this.db.connect();
    this.#setupMiddleware();
    // Attach routes
    this.app.use(this.appRouter.router);
    // ToDo: Add 404 route
    // ToDo: Add Generic Error Handler
  }

  async shutdown() {
    await this.db.disconnect();
  }
}

export default new ExpressApp(cnf, db, router);

// app.listen(cnf.PORT, () => {
//   console.log(`NODE_ENV=${process.env.NODE_ENV}`);
//   console.log(`App running on port ${cnf.PORT}`);
// });
