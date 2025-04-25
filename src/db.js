import mongoose from "mongoose";

export function getDB(cnf, log) {
  return {
    connect: async () => {
      try {
        await mongoose.connect(cnf.DB_CONNECTION);
        log.info("MongoDB connected");
      } catch (err) {
        log.error(err, "Database connection error:");
        throw err;
      }
    },
    disconnect: async () => {
      try {
        await mongoose.connection.close();
        log.info("MongoDB connection closed");
      } catch (err) {
        log.error(err, "Error Disconnecting from Database:");
        throw err;
      }
    },
  };
}
