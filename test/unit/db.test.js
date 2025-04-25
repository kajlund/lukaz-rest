import { test } from "@japa/runner";
import mongoose from "mongoose";

import { getDB } from "../../src/db.js";

test.group("DB connection class tests", () => {
  test("db.connect()", async ({ assert }) => {
    const db = getDB(
      {
        DB_CONNECTION: "mongodb://localhost:27017/testdb",
      },
      {
        info: () => {},
        error: () => {},
      },
    );
    await db.connect();
    assert.equal(mongoose.connection.readyState, 1, "Connection should be connected");
  });
  test("db.disconnect()", async ({ assert }) => {
    const db = getDB(
      {
        DB_CONNECTION: "mongodb://localhost:27017/testdb",
      },
      {
        info: () => {},
        error: () => {},
      },
    );
    await db.disconnect();
    assert.equal(mongoose.connection.readyState, 0, "Connection should be disconnected");
  });
});
