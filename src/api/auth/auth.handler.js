import { Codes } from "../../status.js";
import { getAuthService } from "./auth.service.js";
import { getUserService } from "../users/user.service.js";
import { UnauthorizedError } from "../../errors.js";

export function getAuthHandler(options = { svcAuth: getAuthService(), svcUser: getUserService() }) {
  const { svcAuth, svcUser } = options;

  return {
    logoff: async (req, res, next) => {
      const user = await svcUser.findUserById(req.userId);
      if (!user) throw new UnauthorizedError("Not logged on");
      try {
        // Expire cookie
        //  res.cookie('token', 'logout', {
        //    httpOnly: true,
        //    expires: new Date(Date.now() + 1000),
        //    secure: cnf.isProductionEnv,
        //    signed: true,
        //  });

        // Blacklist token
        await svcAuth.logoff(req.token);
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Logged off user ${user.alias}`,
          data: null,
        });
      } catch (err) {
        next(err);
      }
    },
    logon: async (req, res, next) => {
      const { body } = req;
      try {
        const result = await svcAuth.logon(body);
        if (!result) {
          // ToDo: Add random short delay to make it harder to figure out what was wrong
          throw new UnauthorizedError("Invalid email or password");
        }
        // set auth cookie
        // res.cookie('token', token, {
        //   httpOnly: true,
        //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // week
        //   secure: cnf.isProductionEnv,
        //   signed: true,
        // });

        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Logged on user ${result.user?.alias}`,
          data: result,
        });
      } catch (err) {
        next(err);
      }
    },

    profile: async (req, res, next) => {
      try {
        const user = await svcUser.findUserById(req.userId);
        if (!user) throw new UnauthorizedError("Not logged on");
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Found user profile for ${user?.alias}`,
          data: user,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
