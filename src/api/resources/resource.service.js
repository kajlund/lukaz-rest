import Resource from "./resource.model.js";
import log from "../../logger.js";
import { NotFoundError } from "../../errors.js";
import { parseSort } from "../../utils/index.js";

class ResourceService {
  async createResource(data) {
    log.info(data, "Creating activity:");
    const doc = await Resource.create(data);
    const added = doc.toJSON();
    log.debug(added, "Created resource:");
    return added;
  }

  async deleteResource(id) {
    log.debug(`Deleting resource ${id}`);
    const doc = await Resource.findByIdAndDelete(id);
    if (!doc) throw new NotFoundError(`Resource with id ${id} not found`);
    const deleted = doc.toJSON();
    log.debug(deleted, "Deleted resource:");
    return deleted;
  }

  async findResourceById(id) {
    const doc = await Resource.findById(id);
    if (!doc) throw new NotFoundError(`Resource with id ${id} not found`);
    const found = doc.toJSON();
    log.debug(found, "Found resource:");
    return found;
  }

  async queryResources(query) {
    const { tags, name, sort } = query;
    const qry = {};
    if (tags) {
      qry.tags = { $all: tags.split(",").map((tag) => tag.trim()) };
    }
    if (name) {
      qry.name = { $regex: name, $options: "i" };
    }
    const sortObj = parseSort(sort);
    log.debug(qry, "Finding resources using query:");
    log.debug(sortObj, "and sort:");
    const resources = await Resource.find(qry).sort(sortObj).lean();
    // log.debug(resources, "Found resources:");
    return resources;
  }

  async updateResource(id, data) {
    log.debug(data, `Updating resource ${id}`);
    const doc = await Resource.findByIdAndUpdate(id, data, { new: true });
    const updated = doc.toJSON();
    log.debug(updated, "Updated resource:");
    return updated;
  }
}

export default new ResourceService();
