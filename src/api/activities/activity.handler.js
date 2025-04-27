import { Codes } from "../../status.js";
import { NotFoundError, InternalServerError } from "../../errors.js";
import { getActivityService } from "./activity.service.js";

export function getActivityHandler(options = { svcActivity: getActivityService() }) {
  const { svcActivity } = options;

  return {
    createActivity: async (req, res, next) => {
      const { body } = req;
      try {
        const activity = await svcActivity.createActivity(body);
        if (!activity) throw new InternalServerError("Failed to create activity");
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: "Activity created",
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    deleteActivity: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svcActivity.deleteActivity(id);
        if (!activity) throw new InternalServerError(`Failed to delete activity with id ${id}`);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Deleted activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    findActivityById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svcActivity.findActivityById(id);
        if (!activity) throw new NotFoundError(`Activity with id ${id} not found`);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Found activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    queryActivities: async (req, res, next) => {
      try {
        const activities = await svcActivity.queryActivities(req.query);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Found ${activities.length} activities`,
          data: activities,
        });
      } catch (err) {
        next(err);
      }
    },

    updateActivity: async (req, res, next) => {
      const { params, body } = req;
      try {
        const activity = await svcActivity.updateActivity(params.id, body);
        if (!activity) throw new InternalServerError(`Failed to update activity with id ${params.id}`);
        return res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: `Updated activity ${params.id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
