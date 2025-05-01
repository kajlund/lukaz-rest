import { logonSchema } from "./auth.validators.js";
import validate from "../../middleware/validator.js";
import { getAuthHandler } from "./auth.handler.js";
import { getAuthorizationMiddleware } from "../../middleware/auth.js";

export function getAuthRoutes(opt = { hnd: getAuthHandler(), mw: getAuthorizationMiddleware() }) {
  const { hnd, mw } = opt;

  return {
    group: {
      prefix: "/api/v1/auth",
      middleware: [],
    },
    routes: [
      {
        method: "post",
        path: "/logon",
        middleware: [validate({ body: logonSchema })],
        handler: hnd.logon,
      },
      {
        method: "get",
        path: "/logoff",
        middleware: [mw.authorize],
        handler: hnd.logoff,
      },
      {
        method: "get",
        path: "/profile",
        middleware: [mw.authorize],
        handler: hnd.profile,
      },
    ],
  };
}
