import mongoose from "mongoose";

import { getConfig } from "./config.js";

const cnf = getConfig();

import log from "./logger.js";

class DBConnection {
  constructor(cnf) {
    this.cnf = cnf;
  }

  async connect() {
    try {
      await mongoose.connect(this.cnf.DB_CONNECTION);
      log.info("MongoDB connected");
    } catch (err) {
      log.error(err, "Database connection error:");
      throw err;
    }
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      log.info("MongoDB connection closed");
    } catch (err) {
      log.error(err, "Error Disconnecting from Database:");
      throw err;
    }
  }
}

export default new DBConnection(cnf);
