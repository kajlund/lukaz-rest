import { test } from "@japa/runner";

test("get /ping", async ({ client, assert }) => {
  const response = await client.get("/ping");

  console.log(response.body());
  console.log(response.status());
  assert.equal(response.status(), 200);
  assert.deepEqual(response.body(), { success: true, message: "Pong", status: 200, data: null });
});
