import { test } from "@japa/runner";

import { AppError, BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../../src/errors.js";

test.group("Testing error classes", () => {
  test("AppError", ({ assert }, row) => {
    const err = new AppError(row.message, row.code, row.detail, row.errors);
    assert.instanceOf(err, AppError, "Should be an AppError");
    assert.equal(err.message, row.message, "Should have correct message");
    assert.equal(err.isAppError, true, "Should return true for isAppError");
    assert.deepEqual(
      err.response,
      { success: false, status: row.code, message: row.message, detail: row.detail, errors: row.errors },
      "Should have correct response object",
    );
  }).with([
    {
      message: "Internal Server Error",
      code: 500,
      detail: "",
      errors: null,
    },
    {
      message: "test",
      code: 400,
      detail: "detail",
      errors: [],
    },
  ]);

  test("BadRequestError", ({ assert }) => {
    const errDetails = [{ err: "First" }, { err: "Second" }];
    const response = { success: false, status: 400, message: "Bad Request", detail: "Test", errors: errDetails };
    const err = new BadRequestError("Test", errDetails);
    assert.instanceOf(err, BadRequestError, "Should be a BadRequestError");
    assert.equal(err.message, "Bad Request", "Should have correct message");
    assert.equal(err.isAppError, true, "isAppError should be true");
    assert.deepEqual(err.response, response, "The details should match");
  });

  test("UnauthorizedError", ({ assert }, detail) => {
    const err = new UnauthorizedError(detail);
    assert.instanceOf(err, UnauthorizedError, "Should be an UnauthorizedError");
    assert.equal(err.message, "Unauthorized", "Should have correct message");
    assert.equal(err.isAppError, true, "Should return true for isAppError");
    assert.deepEqual(
      err.response,
      { success: false, status: 401, message: "Unauthorized", detail, errors: null },
      "Should have correct response object",
    );
  }).with(["", "test"]);

  test("NotFoundError", ({ assert }, detail) => {
    const err = new NotFoundError(detail);
    assert.instanceOf(err, NotFoundError, "Should be a NotFoundError");
    assert.equal(err.message, "Not Found", "Should have correct message");
    assert.equal(err.isAppError, true, "Should return true for isAppError");
    assert.deepEqual(
      err.response,
      { success: false, status: 404, message: "Not Found", detail, errors: null },
      "Should have correct response object",
    );
  }).with(["", "test"]);

  test("InternalServerError", ({ assert }, detail) => {
    const err = new InternalServerError(detail);
    assert.instanceOf(err, InternalServerError, "Should be an InternalServerError");
    assert.equal(err.message, "Internal Server Error", "Should have correct message");
    assert.equal(err.isAppError, true, "Should return true for isAppError");
    assert.deepEqual(
      err.response,
      { success: false, status: 500, message: "Internal Server Error", detail, errors: null },
      "Should have correct response object",
    );
  }).with(["", "test"]);
});
