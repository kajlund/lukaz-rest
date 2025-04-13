import { test } from "@japa/runner";

import cnf from "../../src/config.js";

test.group("Configuration tests", () => {
  test("cnf properties and values", ({ assert }) => {
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
