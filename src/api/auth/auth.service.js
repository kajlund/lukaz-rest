// import Proverb from "./proverb.model.js";
import { getLogger } from "../../logger.js";
import { getUserService } from "../users/user.service.js";
import { getAuthUtil } from "../../utils/auth.js";

export function getAuthService(log = getLogger(), svcUser = getUserService(), authUtils = getAuthUtil()) {
  return {
    logon: async (data) => {
      const { email, password } = data;
      log.debug(`Login attempt by user: ${email}`);
      const user = await svcUser.findUserByEmail(email);
      if (!user) return false;
      const pwdOK = await authUtils.comparePasswords(password, user.password);
      if (!pwdOK) return false;
      delete user.password;
      const token = authUtils.generateToken(user);
      if (!token) return false;
      return { user, token };
    },
    logoff: async (token) => {
      log.debug(`Blacklisting token: ${token}`);
      // Todo blacklist token
    },
  };
}
