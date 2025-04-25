import Activity from "./activity.model.js";
import { ActivityBuilder } from "./activity.definitions.js";
import { mToKM, secToHHMMSS, secToMMSS } from "../../utils/index.js";
import { parseSort } from "../../utils/index.js";

export function getActivityServices(options) {
  const { log } = options;

  const docToEntity = (doc) => {
    return {
      id: doc._id,
      when: doc.when,
      activityType: doc.activityType,
      title: doc.title,
      description: doc.description,
      duration: secToHHMMSS(doc.duration),
      distance: mToKM(doc.distance),
      pace: secToMMSS(doc.pace),
      elevation: doc.elevation,
      calories: doc.calories,
      heartRate: doc.heartRate,
      cadence: doc.cadence,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  };

  return {
    createActivity: async (data) => {
      const activity = new ActivityBuilder()
        .setTime(data.when)
        .setType(data.activityType)
        .setTitle(data.title)
        .setDescription(data.description)
        .setDuration(data.duration)
        .setDistance(data.distance)
        .setPace(data.pace)
        .setElevation(data.elevation)
        .setCalories(data.calories)
        .setHeartRate(data.heartRate)
        .setCadence(data.cadence)
        .build();

      log.debug(activity, "Creating new activity:");
      const doc = await Activity.create(activity);
      if (!doc) return null;
      const created = docToEntity(doc.toJSON());
      log.debug(created, "Created new activity:");
      return created;
    },
    deleteActivity: async (id) => {
      log.debug(`Deleting activity ${id}`);
      const doc = await Activity.findByIdAndDelete(id);
      if (!doc) return null;
      const deleted = docToEntity(doc.toJSON());
      log.debug(deleted, "Deleted activity:");
      return deleted;
    },
    findActivityById: async (id) => {
      const doc = await Activity.findById(id);
      if (!doc) return null;
      const found = docToEntity(doc.toJSON());
      log.debug(found, "Found activity:");
      return found;
    },
    queryActivities: async (query) => {
      const { title, sort } = query;
      const qry = {};
      if (title) {
        qry.title = { $regex: title, $options: "i" };
      }
      const sortObj = parseSort(sort);
      log.debug({ qry, sort: sortObj }, "Querying activities:");
      const documents = await Activity.find(qry).sort(sortObj).lean();
      const activities = documents.map((doc) => docToEntity(doc));
      // log.debug(activities, "Found activities:");
      return activities;
    },
    updateActivity: async (id, data) => {
      log.debug(data, `Updating activity ${id}`);
      const activity = new ActivityBuilder()
        .setTime(data.when)
        .setType(data.activityType)
        .setTitle(data.title)
        .setDescription(data.description)
        .setDuration(data.duration)
        .setDistance(data.distance)
        .setPace(data.pace)
        .setElevation(data.elevation)
        .setCalories(data.calories)
        .setHeartRate(data.heartRate)
        .setCadence(data.cadence)
        .build();

      const doc = await Activity.findByIdAndUpdate(id, activity, { new: true });
      if (!doc) return null;
      const updated = docToEntity(doc.toJSON());
      log.debug(updated, "Updated activity:");
      return updated;
    },
  };
}
