import svcResource from "./resource.service.js";
import { Codes } from "../../status.js";
import log from "../../logger.js";

class ResourceHandler {
  async createResource(req, res, next) {
    try {
      log.info("Creating resource", req.body);
      const resource = await svcResource.createResource(req.body);
      res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: "Resource created",
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteResource(req, res, next) {
    try {
      const activity = await svcResource.deleteResource(req.params.id);
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

  async findResourceById(req, res, next) {
    try {
      const activity = await svcResource.findResourceById(req.params.id);
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

  async queryResources(req, res, next) {
    try {
      log.debug(req.query, "Querying resources");
      const resources = await svcResource.queryResources(req.query);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Found ${resources.length} resources`,
        data: resources,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateResource(req, res, next) {
    try {
      const { params, body } = req;
      const resource = await svcResource.updateResource(params.id, body);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: "Resource updated",
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ResourceHandler();
