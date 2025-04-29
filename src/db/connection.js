import { MongoClient } from "mongodb";

import { getConfig } from "../config.js";
import { getLogger } from "../logger.js";

let connection = null;
let db;

export function getMongoDB(options = { cnf: getConfig(), log: getLogger() }) {
  const { cnf, log } = options;

  if (!connection) {
    connection = new MongoClient(cnf.DB_URI, { maxPoolSize: 10 });
  }

  return {
    db,
    connect: async () => {
      try {
        await connection.connect();
        log.info("MongoClient connected");
        db = connection.db(cnf.DB_NAME);
      } catch (err) {
        log.error(err, "MongoClient connection error:");
        throw err;
      }
    },
    disconnect: async () => {
      try {
        await connection.close();
        log.info("MongoClient connection closed");
        db = null;
      } catch (err) {
        log.error(err, "Error Disconnecting MongoClient:");
        throw err;
      }
    },
    getCollection: (name) => {
      return db.collection(name);
    },
  };
}
