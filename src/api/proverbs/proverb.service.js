// import Proverb from "./proverb.model.js";
import { getLogger } from "../../logger.js";
import { getDAO } from "../../db/dao.js";

export function getProverbService() {
  const log = getLogger();
  const collectionName = "proverbs";

  return {
    createProverb: async (data) => {
      log.debug(data, "Creating new proverb:");
      const dao = await getDAO(collectionName);
      const created = await dao.createOne(data);
      log.debug(created, "Created new proverb:");
      return created;
    },
    deleteProverb: async (id) => {
      log.debug(`Deleting proverb ${id}`);
      const dao = await getDAO(collectionName);
      const found = await dao.findById(id);
      if (!found) return null;
      const deleted = await dao.deleteOne(id);
      if (!deleted) return null;
      log.debug(found, "Deleted proverb:");
      return found;
    },
    findProverbById: async (id) => {
      log.debug(`Finding proverb ${id}`);
      const dao = await getDAO(collectionName);
      const found = await dao.findById(id);
      if (!found) return null;
      log.debug(found, "Found proverb:");
      return found;
    },
    queryProverbs: async (query) => {
      const dao = await getDAO(collectionName);
      const { title } = query;
      const qry = {};
      if (title) {
        qry.title = { $regex: title, $options: "i" };
      }
      log.debug({ qry }, "Querying proverbs:");
      const proverbs = await dao.findMany(qry);
      return proverbs;
    },
    updateProverb: async (id, data) => {
      log.debug(data, `Updating proverb ${id}`);
      const dao = await getDAO(collectionName);
      const updated = dao.updateOne(id, data);
      if (!updated) return null;
      const found = await dao.findById(id);
      if (!found) return null;
      log.debug(found, "Updated proverb:");
      return found;
    },
  };
}
