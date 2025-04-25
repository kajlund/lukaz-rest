import { getActivityServices } from "./activity.service.js";
import { Codes } from "../../status.js";
import { getLogger } from "../../logger.js";
import { NotFoundError, InternalServerError } from "../../errors.js";

const log = getLogger();
const svcActivity = getActivityServices({ log });
class ActivityHandler {
  async createActivity(req, res, next) {
    try {
      log.info("Creating activity", req.body);
      const activity = await svcActivity.createActivty(req.body);
      if (!activity) throw new InternalServerError("Failed creating activity");
      res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: "Activity created",
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteActivity(req, res, next) {
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
  }

  async findActivityById(req, res, next) {
    const { id } = req.params;
    try {
      const activity = await svcActivity.findActivityById(id);
      if (!activity) throw new NotFoundError(`Activity with id ${id} not found`);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Activity ${activity.id} found`,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async queryActivities(req, res, next) {
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
  }

  async updateActivity(req, res, next) {
    const { params, body } = req;
    try {
      const activity = await svcActivity.updateActivity(params.id, body);
      if (!activity) throw new InternalServerError(`Failed to update activity with id ${params.id}`);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Upfated activity ${params.id}`,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ActivityHandler();
