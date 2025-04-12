import assert from "node:assert/strict";
import { describe, it } from "node:test";

import mongoose from "mongoose";

import db from "../src/db.js";

describe("Test DB connection class", () => {
  it("should be able to connect", async () => {
    await db.connect();
    assert.strictEqual(mongoose.connection.readyState, 1);
  });

  it("should be able to disconnect from db", async () => {
    await db.disconnect();
    assert.strictEqual(mongoose.connection.readyState, 0);
  });
});
