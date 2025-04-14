import { test } from "@japa/runner";

import { AppError, BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../../src/errors.js";

test.group("Error classes tests", () => {
  test("AppError", ({ assert }) => {
    const err = new AppError("Test", 400, "Detail");
    assert.instanceOf(err, AppError, "err should be an AppError instance");
    assert.equal(err.message, "Test", "The message should be 'Test'");
    assert.equal(err.code, 400, "AppError statusCode should be code 400");
    assert.equal(err.isAppError, true, "isApprror should be true");
  });

  test("UnauthorizedError", ({ assert }) => {
    const err = new UnauthorizedError("Test");
    assert.instanceOf(err, UnauthorizedError, "err should be an UnauthorizedError instance");
    assert.equal(err.message, "Unauthorized", "The message should be 'Unauthorized'");
    assert.equal(err.code, 401, "UnauthorizedError code should be 401");
    assert.equal(err.isAppError, true, "isAppError should be true");
    assert.equal(err.detail, "Test", "The message should be 'Test'");
  });

  test("BadRequestError", ({ assert }) => {
    const errDetails = [{ err: "First" }, { err: "Second" }];
    const err = new BadRequestError(errDetails);
    assert.instanceOf(err, BadRequestError, "err should be a BadRequestError instance");
    assert.equal(err.message, "Bad Request", "The message should be 'Bad Request'");
    assert.equal(err.code, 400, "BadRequestError code should be 400");
    assert.equal(err.isAppError, true, "isAppError should be true");
    assert.deepEqual(err.detail, errDetails, "The details should match");
  });

  test("NotFoundError", ({ assert }) => {
    const err = new NotFoundError("Test");
    assert.instanceOf(err, NotFoundError, "err should be a NotFoundError instance");
    assert.equal(err.message, "Not Found", "The message should be 'Not Found'");
    assert.equal(err.code, 404, "NotFoundError code should be 404");
    assert.equal(err.isAppError, true, "isAppError should be true");
    assert.deepEqual(err.detail, "Test", "The details should match");
  });

  test("InternalServerError", ({ assert }) => {
    const err = new InternalServerError("Test");
    assert.instanceOf(err, InternalServerError, "err should be a InternalServerError instance");
    assert.equal(err.message, "Internal Server Error", "The message should be 'Internal Server Error'");
    assert.equal(err.code, 500, "InternalServerError code should be 500");
    assert.equal(err.isAppError, true, "isAppError should be true");
    assert.equal(err.detail, "Test", "The details should match");
  });
});
