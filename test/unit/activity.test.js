import { test } from "@japa/runner";

import { ActivityBuilder } from "../../src/api/activities/activity.definitions.js";

test.group("Testing ActivityBuilder class", () => {
  test("ActivityBuilder", ({ assert }) => {
    const activity = new ActivityBuilder()
      .setTime("2023-10-01")
      .setType("Outdoor Walk")
      .setTitle("Morning Run")
      // .setDescription("A quick morning run")
      .setDuration("01:10:30")
      .setDistance(5.55)
      .setPace("05:00")
      .setElevation(34)
      .setCalories(500)
      .setHeartRate(150)
      .setCadence(80)
      .build();

    assert.match(activity.when, /^2023-10-01/);
    assert.equal(activity.activityType, "Outdoor Walk");
    assert.equal(activity.title, "Morning Run");
    assert.equal(activity.description, "");
    assert.equal(activity.duration, 4230);
    assert.equal(activity.distance, 5550);
    assert.equal(activity.elevation, 34);
    assert.equal(activity.calories, 500);
    assert.equal(activity.pace, 300);
    assert.equal(activity.heartRate, 150);

    assert.equal(activity.durationString, "01:10:30");
    assert.equal(activity.distanceKm, 5.55);
    assert.equal(activity.paceString, "05:00");
  });
});
