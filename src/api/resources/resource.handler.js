import { Codes } from "../../status.js";
import { NotFoundError, InternalServerError } from "../../errors.js";

export function getResourceHandler(options) {
  const { svcResource } = options;

  return {
    createResource: async (req, res, next) => {
      const { body } = req;
      try {
        const resource = await svcResource.createResource(body);
        if (!resource) throw new InternalServerError("Failed to create resource");
        res.status(Codes.OK).json({
          success: true,
          status: Codes.OK,
          message: "Resource created",
          data: resource,
        });
      } catch (err) {
        next(err);
      }
    },

    deleteResource: async (req, res, next) => {
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
    },

    findResourceById: async (req, res, next) => {
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
    },

    queryResources: async (req, res, next) => {
      try {
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
    },

    updateResource: async (req, res, next) => {
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
    },
  };
}
