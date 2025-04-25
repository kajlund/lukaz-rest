import { getLogger } from "../../logger.js";
import svcResource from "./resource.service.js";
import { Codes } from "../../status.js";
import { NotFoundError, InternalServerError } from "../../errors.js";

const log = getLogger();
class ResourceHandler {
  async createResource(req, res, next) {
    try {
      log.debug(req.body, "Creating resource:");
      const resource = await svcResource.createResource(req.body);
      if (!resource) throw new InternalServerError("Failed creating resource");
      res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Created resource ${resource.name}`,
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteResource(req, res, next) {
    const { id } = req.params;
    try {
      const resource = await svcResource.deleteResource(id);
      if (!resource) throw new InternalServerError(`Failed to delete resource with id ${id}`);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Deleted resource ${id}`,
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }

  async findResourceById(req, res, next) {
    const { id } = req.params;
    try {
      const resource = await svcResource.findResourceById(id);
      if (!resource) throw new NotFoundError(`Resource with id ${id} not found`);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Found resource ${id}`,
        data: resource,
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
    const { params, body } = req;
    try {
      const resource = await svcResource.updateResource(params.id, body);
      if (!res) throw new InternalServerError(`Failed to update resource with id ${params.id}`);
      return res.status(Codes.OK).json({
        success: true,
        status: Codes.OK,
        message: `Updated resource ${params.id}`,
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ResourceHandler();
