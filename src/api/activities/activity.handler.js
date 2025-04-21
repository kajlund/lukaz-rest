import svcActivity from "./activity.service.js";
import { Codes } from "../../status.js";
import log from "../../logger.js";

class ActivityHandler {
  async createActivity(req, res, next) {
    try {
      log.info("Creating activity", req.body);
      const activity = await svcActivity.createActivty(req.body);
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
    try {
      const activity = await svcActivity.deleteActivity(req.params.id);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Activity ${req.objectId} deleted`,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async findActivityById(req, res, next) {
    try {
      const activity = await svcActivity.findActivityById(req.params.id);
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
      const activities = await svcActivity.queryActivities({});
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
    try {
      const { params, body } = req;
      const activity = await svcActivity.updateActivity(params.id, body);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Activity ${params.id} updated`,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ActivityHandler();
