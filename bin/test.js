import { configure, processCLIArgs, run } from "@japa/runner";
import { apiClient } from "@japa/api-client";
import { assert } from "@japa/assert";

processCLIArgs(process.argv.splice(2));
configure({
  suites: [
    {
      name: "unit",
      files: "test/unit/**/*.test.js",
    },
    {
      name: "e2e",
      files: "test/e2e/**/*.test.js",
    },
  ],
  plugins: [assert(), apiClient("http://localhost:4000")],
});

run();
