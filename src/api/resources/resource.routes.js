import { resourceSchema, querySchema } from "./resource.validators.js";
import { idSchema } from "../../utils/shared-schemas.js";
import validate from "../../middleware/validator.js";

export function getResourceRoutes(options) {
  const { hnd } = options;

  return {
    group: {
      prefix: "/api/v1/resources",
      middleware: [],
    },
    routes: [
      {
        method: "get",
        path: "/",
        middleware: [validate({ query: querySchema })],
        handler: hnd.queryResources,
      },
      {
        method: "get",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.findResourceById,
      },
      {
        method: "post",
        path: "/",
        middleware: [validate({ body: resourceSchema })],
        handler: hnd.createResource,
      },
      {
        method: "put",
        path: "/:id",
        middleware: [validate({ params: idSchema, body: resourceSchema })],
        handler: hnd.updateResource,
      },
      {
        method: "delete",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteResource,
      },
    ],
  };
}
