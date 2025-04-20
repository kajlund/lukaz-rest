import Activity from "./activity.model.js";
import log from "../../logger.js";
import { NotFoundError } from "../../errors.js";

import { ActivityBuilder } from "./activity.definitions.js";
import { mToKM, secToHHMMSS, secToMMSS } from "../../utils/index.js";

class ActivityService {
  #docToEntity(doc) {
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
  }

  async createActivty(data) {
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

    log.info(activity, "Creating activity:");
    const doc = await Activity.create(activity);
    const added = this.#docToEntity(doc.toJSON());
    log.debug(added, "Created activity:");
    return added;
  }

  async deleteActivity(id) {
    const doc = await Activity.findByIdAndDelete(id);
    log.debug(doc, "Deleted activity:");

    // const deleted = this.#docToEntity(doc.toJSON());
    // log.debug(deleted, "Deleted activity:");
    // return deleted;
  }

  async findActivityById(id) {
    const doc = await Activity.findById(id);
    if (!doc) throw new NotFoundError(`Activity with id ${id} not found`);
    const found = this.#docToEntity(doc.toJSON());
    log.debug(found, "Found activity:");
    return found;
  }

  async queryActivities(qry = {}, sort = { when: -1 }) {
    log.debug(qry, "Finding activities using query:");
    const docs = await Activity.find(qry).sort(sort).lean();
    const activities = docs.map((doc) => this.#docToEntity(doc));
    log.debug(activities, "Found activities:");
    return activities;
  }

  async updateActivity(id, data) {
    log.debug(data, `Updating activity for ${id}:`);
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
    const updated = this.#docToEntity(doc.toJSON());
    log.debug(updated, "Updated activity:");
    return updated;
  }
}

export default new ActivityService();
