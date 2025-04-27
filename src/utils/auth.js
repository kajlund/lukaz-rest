import bcrypt from "bcryptjs";
import { getConfig } from "../config.js";

export function authUtil(cnf = getConfig()) {
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
  };
}
