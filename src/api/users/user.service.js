import { BadRequestError } from "../../errors.js";
import { getAuthUtil } from "../../utils/auth.js";
import { getDAO } from "../../db/dao.js";
import { parseSort } from "../../utils/index.js";
import { getLogger } from "../../logger.js";
import { UserBuilder } from "./user.model.js";

export function getUserService(opts = { log: getLogger(), authUtils: getAuthUtil(), userDAO: getDAO("users") }) {
  const { log, authUtils, userDAO } = opts;

  return {
    createUser: async (data) => {
      log.debug(`Check for duplicate: ${data.email}`);
      const existing = await userDAO.findOne({ email: data.email });
      if (existing) throw new BadRequestError("Email already registered");
      const hashed = await authUtils.hashPassword(data.password);
      const user = new UserBuilder().setEmail(data.email).setAlias(data.alias).setPassword(hashed).build();
      log.debug(user, "Creating user:");
      const created = await userDAO.createOne(user);
      log.debug(created, "Created new user:");
      return created;
    },
    deleteUser: async (id) => {
      log.debug(`Deleting user ${id}`);
      const found = await userDAO.findById(id);
      if (!found) return null;
      const deleted = await userDAO.deleteOne(id);
      if (!deleted) return null;
      // Remove password from the deleted user object
      delete found.password;
      log.debug(found, `Deleted user: ${id}`);
      return found;
    },
    findUserByEmail: async (email) => {
      const found = await userDAO.findOne({ email });
      if (!found) return null;
      log.debug(found, `Found user by email: ${email}`);
      return found;
    },
    findUserById: async (id) => {
      const found = await userDAO.findById(id);
      if (!found) return null;
      // Remove password from the found user object
      delete found.password;
      log.debug(found, `Found user by id: ${id}:`);
      return found;
    },
    queryUsers: async (query) => {
      const { tags, name, sort } = query;
      const qry = {};
      if (tags) {
        qry.tags = { $all: tags.split(",").map((tag) => tag.trim()) };
      }
      if (name) {
        qry.name = { $regex: name, $options: "i" };
      }
      const sortObj = parseSort(sort);
      log.debug({ qry, sort: sortObj }, "Querying users:");
      const users = await userDAO.findMany(qry, sort);
      users.forEach((user) => {
        // Remove password from the user object
        delete user.password;
      });
      // log.debug(users, "Found users:");
      return users;
    },
    updateUser: async (id, data) => {
      log.debug(data, `Updating user: ${id}`);
      const updated = await userDAO.updateOne(id, data);
      if (!updated) return null;
      const found = await userDAO.findById(id);
      // Remove password from the found user object
      delete found.password;
      if (!found) return null;
      // Remove password from the updated user object
      delete updated.password;
      log.debug(found, `Updated user: ${id}`);
      return found;
    },
  };
}
