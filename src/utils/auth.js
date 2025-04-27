import bcrypt from "bcryptjs";

export function authUtil(options) {
  const { cnf, log } = options;
  return {
    hashPassword: async (password) => {
      log.debug("Hashing password");
      const salt = await bcrypt.genSalt(cnf.saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    },
    comparePasswords: async (candidatePassword, hashedPassword) => {
      log.debug("Comparing passwords");
      const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
      return isMatch;
    },
  };
}
