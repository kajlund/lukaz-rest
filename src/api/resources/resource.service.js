import Resource from "./resource.model.js";
import { parseSort } from "../../utils/index.js";

export function getResourceServices(options) {
  const { log } = options;

  return {
    createResource: async (data) => {
      log.debug(data, "Creating resource:");
      const doc = await Resource.create(data);
      if (!doc) return null;
      const created = doc.toJSON();
      log.debug(created, "Created new resource:");
      return created;
    },
    deleteResource: async (id) => {
      log.debug(`Deleting resource ${id}`);
      const doc = await Resource.findByIdAndDelete(id);
      if (!doc) return null;
      const deleted = doc.toJSON();
      log.debug(deleted, "Deleted resource:");
      return deleted;
    },
    findResourceById: async (id) => {
      const doc = await Resource.findById(id);
      if (!doc) return null;
      const found = doc.toJSON();
      log.debug(found, "Found resource:");
      return found;
    },
    queryResources: async (query) => {
      const { tags, name, sort } = query;
      const qry = {};
      if (tags) {
        qry.tags = { $all: tags.split(",").map((tag) => tag.trim()) };
      }
      if (name) {
        qry.name = { $regex: name, $options: "i" };
      }
      const sortObj = parseSort(sort);
      log.debug({ qry, sort: sortObj }, "Querying resources:");
      const resources = await Resource.find(qry).sort(sortObj).lean();
      // log.debug(resources, "Found resources:");
      return resources;
    },
    updateResource: async (id, data) => {
      log.debug(data, `Updating resource ${id}`);
      const doc = await Resource.findByIdAndUpdate(id, data, { new: true });
      if (!doc) return null;
      const updated = doc.toJSON();
      log.debug(updated, "Updated resource:");
      return updated;
    },
  };
}
