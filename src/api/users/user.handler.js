import { Codes } from "../../status.js";
import { NotFoundError, InternalServerError } from "../../errors.js";
import { getUserService } from "./user.service.js";

export function getUserHandler(options = { svcUser: getUserService() }) {
  const { svcUser } = options;

  return {
    createUser: async (req, res, next) => {
      const { body } = req;
      try {
        const user = await svcUser.createUser(body);
        if (!user) throw new InternalServerError("Failed creating user");
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Created user ${user.alias}`,
          data: user,
        });
      } catch (err) {
        next(err);
      }
    },

    deleteUser: async (req, res, next) => {
      const { id } = req.params;
      try {
        const user = await svcUser.deleteUser(id);
        if (!user) throw new InternalServerError(`Failed to delete user with id ${id}`);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Deleted user ${id}`,
          data: user,
        });
      } catch (err) {
        next(err);
      }
    },

    findUserById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const user = await svcUser.findUserById(id);
        if (!user) throw new NotFoundError(`User with id ${id} not found`);
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Found user ${user.alias}`,
          data: user,
        });
      } catch (err) {
        next(err);
      }
    },

    queryUsers: async (req, res, next) => {
      try {
        const users = await svcUser.queryUsers(req.query);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Found ${users.length} users`,
          data: users,
        });
      } catch (err) {
        next(err);
      }
    },

    updateUser: async (req, res, next) => {
      const { params, body } = req;
      try {
        const user = await svcUser.updateUser(params.id, body);
        if (!user) throw new InternalServerError(`Failed to update user with id ${params.id}`);
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Updated user ${params.id}`,
          data: user,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
