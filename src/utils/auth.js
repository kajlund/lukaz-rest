import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getConfig } from "../config.js";
import { getLogger } from "../logger.js";

export function authUtil(cnf = getConfig(), log = getLogger()) {
  return {
    hashPassword: async (password) => {
      const salt = await bcrypt.genSalt(cnf.saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    },
    comparePasswords: async (candidatePassword, hashedPassword) => {
      const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
      return isMatch;
    },
    decodeJWT: (token) => {
      const decoded = jwt.verify(token, cnf.jwtSecret);
      return decoded;
    },
    generateToken: (user) => {
      const token = jwt.sign({ id: user.id, role: user.role }, cnf.jwtSecret, {
        expiresIn: cnf.jwtExpiresIn,
      });
      log.debug(user, `Generating token for user: ${token}`);
      return token;
    },
  };
}
