import { getConfig } from "../../config.js";
import { getLogger } from "../../logger.js";
import { getResourceHandler } from "./resource.handler.js";
import { getResourceServices } from "./resource.service.js";
import { resourceSchema, querySchema } from "./resource.validators.js";
import { idSchema } from "../../utils/shared-schemas.js";
import validate from "../../middleware/validator.js";

const cnf = getConfig();
const log = getLogger(cnf);
const svcResource = getResourceServices({ log });
const hnd = getResourceHandler({ svcResource });

export default {
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
