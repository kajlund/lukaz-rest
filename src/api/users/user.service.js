import User from "./user.model.js";
import { getGravatar, parseSort } from "../../utils/index.js";
import { BadRequestError } from "../../errors.js";

export function getUserServices(options) {
  // eslint-disable-next-line no-unused-vars
  const { cnf, log, authUtils } = options;

  return {
    createUser: async (data) => {
      let doc;
      log.debug("Hashing password");
      data.password = await authUtils.hashPassword(data.password);
      log.debug("Generating gravatar");
      data.gravatar = getGravatar(data.email);
      log.debug(`Check for duplicate: ${data.email}`);
      const existing = await User.findOne({ email: data.email });
      if (existing) throw new BadRequestError("Email already registered");
      log.debug(data, "Creating user:");
      try {
        doc = await User.create(data);
      } catch (err) {
        log.debug(err, "Error creating user:");
      }

      if (!doc) return null;
      const created = doc.toJSON();
      // Remove password from the created user object
      delete created.password;
      log.debug(created, "Created new user:");
      return created;
    },
    deleteUser: async (id) => {
      log.debug(`Deleting user ${id}`);
      const doc = await User.findByIdAndDelete(id);
      if (!doc) return null;
      const deleted = doc.toJSON();
      // Remove password from the deleted user object
      delete deleted.password;
      log.debug(deleted, "Deleted user:");
      return deleted;
    },
    findUserByEmail: async (email) => {
      const doc = await User.findOne({ email });
      if (!doc) return null;
      const found = doc.toJSON();
      log.debug(found, "Found user:");
      return found;
    },
    findUserById: async (id) => {
      const doc = await User.findById(id);
      if (!doc) return null;
      const found = doc.toJSON();
      // Remove password from the found user object
      delete found.password;
      log.debug(found, "Found user:");
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
      const users = await User.find(qry).sort(sortObj).lean();
      users.forEach((user) => {
        // Remove password from the user object
        delete user.password;
      });
      // log.debug(users, "Found users:");
      return users;
    },
    updateUser: async (id, data) => {
      log.debug(data, `Updating user ${id}`);
      const doc = await User.findByIdAndUpdate(id, data, { new: true });
      if (!doc) return null;
      const updated = doc.toJSON();
      // Remove password from the updated user object
      delete updated.password;
      log.debug(updated, "Updated user:");
      return updated;
    },
  };
}
