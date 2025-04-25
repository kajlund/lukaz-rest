import { test } from "@japa/runner";

import { getConfig } from "../../src/config.js";

test.group("Configuration tests", () => {
  test("cnf properties and values", ({ assert }) => {
    const cnf = getConfig({
      NODE_ENV: "test",
      PORT: 4000,
      LOG_LEVEL: "silent",
      LOG_HTTP: 0,
      DB_CONNECTION: "mongodb://localhost:27017/testdb",
    });
    assert.isObject(cnf);
    assert.containsSubset(cnf, {
      isDev: false,
      isProd: false,
      isTest: true,
      NODE_ENV: "test",
      PORT: 4000,
      LOG_LEVEL: "silent",
      LOG_HTTP: 0,
    });
    assert.match(cnf.DB_CONNECTION, /^mongodb:/);
  });
});
