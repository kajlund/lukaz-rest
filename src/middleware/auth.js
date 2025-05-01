import { getAuthUtil } from "../utils/auth.js";
import { getLogger } from "../logger.js";
import { UnauthorizedError } from "../errors.js";

export function getAuthorizationMiddleware(opt = { log: getLogger(), utils: getAuthUtil() }) {
  const { log, utils } = opt;

  return {
    authorize: async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
          return next(new UnauthorizedError());
        }
        const token = authHeader.split(" ")[1];
        const decoded = await utils.decodeJWT(token);
        if (!decoded) return next(new UnauthorizedError());
        // ToDo: Ensure token is not blacklisted
        req.token = token;
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
      } catch (err) {
        log.error(err);
        return next(new UnauthorizedError(err.message));
      }
    },
    isAdmin: (req, res, next) => {
      if (!req.userRole === "admin") return next(new UnauthorizedError());
      return next();
    },
    isUser: (req, res, next) => {
      if (req.userRole === "user" || req.userRole === "admin") return next();
      next(new UnauthorizedError());
    },
  };
}
