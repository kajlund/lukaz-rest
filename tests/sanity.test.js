import assert from "node:assert/strict";
import { describe, it } from "node:test";

function sum(a, b) {
  return a + b;
}

describe("Sanity tests", () => {
  it("should sum 2 numbers", () => {
    const tot = sum(2, 2);
    assert.strictEqual(tot, 4);
  });
});
