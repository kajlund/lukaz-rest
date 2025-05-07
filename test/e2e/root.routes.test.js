import { test } from "@japa/runner";

test.group("Testing root routes", (group) => {
  group.setup(() => {});

  test("get /ping", async ({ client, assert }) => {
    const response = await client.get("/ping");
    assert.equal(response.status(), 200);
    assert.deepEqual(response.body(), { success: true, message: "Pong", status: 200, data: null });
  });

  test("get /notfound", async ({ client, assert }) => {
    const response = await client.get("/notfound");
    console.log(response.body());
    console.log(response.status());
    assert.equal(response.status(), 404);
    assert.deepEqual(response.body(), {
      success: false,
      status: 404,
      message: "Not Found",
      detail: "Route /notfound was not found",
      errors: null,
    });
  });
});
