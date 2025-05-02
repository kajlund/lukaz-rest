import { test } from "@japa/runner";

import { UserBuilder } from "../../src/api/users/user.model.js";

test.group("StatusCodes and ReasonPhrases tests", (group) => {
  let user;

  group.setup(() => {
    user = new UserBuilder().setEmail("test@mail.com").setAlias("Tester").setPassword("Abc12345").build();
  });

  test("Id should be null", ({ assert }) => {
    assert.equal(user.id, null);
  });
  test("Email should be correct", ({ assert }) => {
    assert.equal(user.email, "test@mail.com");
  });
  test("Alias should be correct", ({ assert }) => {
    assert.equal(user.alias, "Tester");
  });
  test("Password should be correct", ({ assert }) => {
    assert.equal(user.password, "Abc12345");
  });
});
