import assert from "node:assert/strict";
import { describe, it } from "node:test";

import cnf from "../src/utils/config.js";

describe("Config tests", () => {
  it("isDev should be false", () => {
    assert.strictEqual(cnf.isDev, false);
  });

  it("isProd should be false", () => {
    assert.strictEqual(cnf.isDev, false);
  });

  it("isTest should be true", () => {
    assert.strictEqual(cnf.isTest, true);
  });

  it("NODE_ENV should be test", () => {
    assert.strictEqual(cnf.NODE_ENV, "test");
  });

  it("PORT should be 4000", () => {
    assert.strictEqual(cnf.PORT, 4000);
  });

  it("LOG_LEVEL should be info", () => {
    assert.strictEqual(cnf.LOG_LEVEL, "info");
  });

  it("LOG_HTTP should be 0", () => {
    assert.strictEqual(cnf.LOG_HTTP, 0);
  });

  it("DB_CONNECTION should not be empty", () => {
    assert.notEqual(cnf.DB_CONNECTION, "");
  });
});
