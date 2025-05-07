import { test } from "@japa/runner";
// import { getDAO } from "../../db/dao.js";

test.group("Testing user routes", (group) => {
  // const userDAO: getDAO("users")
  let userId;
  group.setup(() => {});

  test("List users", async ({ client, assert }) => {
    const response = await client.get("/api/v1/users");
    console.log(response.status());
    console.log(response.body());
    assert.equal(response.status(), 200);
    // assert.deepEqual(response.body(), { success: true, message: "Pong", status: 200, data: null });
  });

  test("User by Id", async ({ client, assert }) => {
    const response = await client.get(`/api/v1/users/${userId}`);
    console.log(response.status());
    console.log(response.body());
    assert.equal(response.status(), 200);
    // assert.deepEqual(response.body(), {
    //   success: false,
    //   status: 404,
    //   message: "Not Found",
    //   detail: "Route /notfound was not found",
    //   errors: null,
    // });
  });
});
