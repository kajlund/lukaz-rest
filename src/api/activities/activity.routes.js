import { activitySchema } from "./activity.validators.js";
import { idSchema } from "../../utils/shared-schemas.js";
import validate from "../../middleware/validator.js";

export function getActivityRoutes(options) {
  const { hnd } = options;

  return {
    group: {
      prefix: "/api/v1/activities",
      middleware: [],
    },
    routes: [
      {
        method: "get",
        path: "/",
        middleware: [],
        handler: hnd.queryActivities,
      },
      {
        method: "get",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.findActivityById,
      },
      {
        method: "post",
        path: "/",
        middleware: [validate({ body: activitySchema })],
        handler: hnd.createActivity,
      },
      {
        method: "put",
        path: "/:id",
        middleware: [validate({ params: idSchema, body: activitySchema })],
        handler: hnd.updateActivity,
      },
      {
        method: "delete",
        path: "/:id",
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteActivity,
      },
    ],
  };
}
