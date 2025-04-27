import { idSchema } from "../../utils/shared-schemas.js";
import validate from "../../middleware/validator.js";
import { addUserSchema, updateUserSchema } from "./user.validators.js";

export function getUserRoutes(options) {
  const { hnd } = options;

  return {
    group: {
      prefix: "/api/v1/users",
      middleware: [], // authorize, isAdmin
    },
    routes: [
      {
        method: "get",
        path: "/",
        middleware: [],
        handler: hnd.queryUsers,
      },
      {
        method: "post",
        path: "/",
        middleware: [validate({ body: addUserSchema })],
        handler: hnd.createUser,
      },
      {
        method: "get",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.findUserById,
      },
      {
        method: "put",
        path: "/:id",
        middleware: [validate({ params: idSchema, body: updateUserSchema })],
        handler: hnd.updateUser,
      },
      {
        method: "delete",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteUser,
      },
    ],
  };
}
