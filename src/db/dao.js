import { ObjectId } from "mongodb";

import { getLogger } from "../logger.js";
import { getMongoDB } from "./connection.js";

export async function getDAO(collectionName) {
  const log = getLogger();
  const mongo = getMongoDB();

  return {
    createOne: async (data) => {
      const coll = mongo.getCollection(collectionName);
      log.debug(data, `Creating doc in ${collectionName}:`);
      const result = await coll.insertOne(data);
      if (!result.acknowledged) return null;
      const found = await coll.findOne({ _id: result.insertedId });
      log.info(found, "Created");
      return found;
    },
    deleteOne: async (id) => {
      log.debug(`Deleting doc in ${collectionName} with id ${id}`);
      const coll = mongo.getCollection(collectionName);
      const result = await coll.deleteOne({ _id: ObjectId.createFromHexString(id) });
      return result.deletedCount > 0; // Return true if deleted
    },
    findById: async (id) => {
      log.debug(`Finding doc in ${collectionName} with id ${id}`);
      const coll = mongo.getCollection(collectionName);
      const result = await coll.findOne({ _id: ObjectId.createFromHexString(id) });
      return result; // Return found document or null
    },
    findOne: async (query) => {
      log.debug(query, `Finding doc in ${collectionName} with query:`);
      const coll = mongo.getCollection(collectionName);
      const result = await coll.findOne(query);
      return result; // Return found document or null
    },
    findMany: async (query) => {
      // const { filter, sort, limit, skip } = query
      // how to handle filter, sort, limit, skip
      log.debug(query, `Finding docs in ${collectionName} with query:`);
      const coll = mongo.getCollection(collectionName);
      const result = await coll.find().toArray();
      return result; // Return found documents or empty array
    },
    updateOne: async (id, data) => {
      log.debug(data, `Updating doc in ${collectionName} with id ${id}:`);
      const coll = mongo.getCollection(collectionName);
      const result = await coll.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });
      return result.modifiedCount > 0; // Return true if updated
    },
  };
}
