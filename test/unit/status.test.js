import { test } from "@japa/runner";

import { Codes, Phrases } from "../../src/status.js";

test.group("StatusCodes and ReasonPhrases tests", () => {
  test("Codes", ({ assert }) => {
    assert.equal(Codes.OK, 200, "OK should be code 200");
    assert.equal(Codes.CREATED, 201, "Created should be code 201");
    assert.equal(Codes.NO_CONTENT, 204, "No Content should be code 204");
    assert.equal(Codes.BAD_REQUEST, 400, "Bad Request should be code 400");
    assert.equal(Codes.UNAUTHORIZED, 401, "Unauthorized should be code 401");
    assert.equal(Codes.NOT_FOUND, 404, "Not Found should be code 404");
    assert.equal(Codes.INTERNAL_SERVER_ERROR, 500, "Internal Server Error should be code 500");
    assert.equal(Codes.NOT_IMPLEMENTED, 501, "Not Implemented should be code 501");
  });

  test("Phrases", ({ assert }) => {
    assert.equal(Phrases.OK, "OK", "Phrase OK should equal 'OK'");
    assert.equal(Phrases.CREATED, "Created", "Phrase CREATED should equal 'Created'");
    assert.equal(Phrases.NO_CONTENT, "No content", "Phrase NO_CONTENT should equal 'No content'");
    assert.equal(Phrases.BAD_REQUEST, "Bad Request", "Phrase BAD_REQUEST should equal 'Bad Request'");
    assert.equal(Phrases.UNAUTHORIZED, "Unauthorized", "Phrase UNAUTHORIZED should equal 'Unauthorized'");
    assert.equal(Phrases.NOT_FOUND, "Not Found", "Phrase NOT_FOUND should equal 'Not Found'");
    assert.equal(
      Phrases.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "Phrase INTERNAL_SERVER_ERROR should equal 'Internal Server Error'",
    );
    assert.equal(Phrases.NOT_IMPLEMENTED, "Not Implemented", "Phrase NOT_IMPLEMENTED should equal 'Not Implemented'");
  });
});
