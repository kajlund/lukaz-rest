import { test } from "@japa/runner";

import { getLogger } from "../../src/logger.js";

const cnfDev = {
  isProd: false,
  NODE_ENV: "development",
  LOG_LEVEL: "trace",
};

const cnfProd = {
  isProd: true,
  NODE_ENV: "production",
  LOG_LEVEL: "info",
};

test.group("Logger tests", () => {
  test("devmode logger", ({ assert }) => {
    const log = getLogger(cnfDev);
    assert.isObject(log);
    assert.typeOf(log.info, "function");
    assert.typeOf(log.error, "function");
    assert.typeOf(log.debug, "function");
    assert.typeOf(log.warn, "function");
    assert.typeOf(log.fatal, "function");
    assert.typeOf(log.trace, "function");
    assert.equal(log.level, "trace");
  });
  test("prodmode logger", ({ assert }) => {
    const log = getLogger(cnfProd);
    assert.isObject(log);
    assert.typeOf(log.info, "function");
    assert.typeOf(log.error, "function");
    assert.typeOf(log.debug, "function");
    assert.typeOf(log.warn, "function");
    assert.typeOf(log.fatal, "function");
    assert.typeOf(log.trace, "function");
    assert.equal(log.level, "info");
  });
});
