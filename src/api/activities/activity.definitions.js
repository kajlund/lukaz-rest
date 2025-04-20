// List of allowed activities
export const activityTypes = ["Outdoor Walk", "Indoor Walk", "Strength Training", "Badminton", "Cycling", "Running"];

/**
 * Activity class representing a fitness activity.
 * This class encapsulates various properties related to an activity,
 * such as when it occurred, its type, title, description, duration,
 * distance, pace, elevation, calories burned, heart rate, and cadence.
 * It provides a constructor for initializing these properties and
 * a builder class for creating Activity objects in a fluent manner.
 */
class ActivityObject {
  constructor({
    when,
    activityType,
    title,
    description = "",
    duration = 0,
    distance = 0,
    pace = 0,
    elevation = 0,
    calories = 0,
    heartRate = 0,
    cadence = 0,
  }) {
    this.when = when;
    this.activityType = activityType;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.distance = distance;
    this.pace = pace;
    this.elevation = elevation;
    this.calories = calories;
    this.heartRate = heartRate;
    this.cadence = cadence;
  }

  get durationString() {
    if (!this.duration) return "00:00";
    const hours = Math.floor(this.duration / 3600);
    const minutes = Math.floor((this.duration % 3600) / 60);
    const remainingSeconds = this.duration % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  get distanceKm() {
    return this.distance / 1000;
  }
  get paceString() {
    if (!this.pace) return "00:00";
    const minutes = Math.floor((this.pace % 3600) / 60);
    const remainingSeconds = this.pace % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }
}

/**
 * Builder class for creating Activity objects.
 * This class allows you to set various properties of the Activity
 * using a fluent interface, making it easier to create complex objects.
 */
export class ActivityBuilder {
  #when;
  #activityType;
  #title;
  #description;
  #duration;
  #distance;
  #pace;
  #elevation;
  #calories;
  #heartRate;
  #cadence;

  setTime(when) {
    this.#when = new Date(when);
    if (this.#when.toString() === "Invalid Date") {
      throw new Error(`Invalid date format: ${when}`);
    }

    return this;
  }

  setType(activityType) {
    if (!activityTypes.includes(activityType.trim())) {
      throw new Error(`Invalid activity type: ${activityType}`);
    }
    this.#activityType = activityType.trim();
    return this;
  }

  setTitle(title = "") {
    this.#title = title.trim();
    return this;
  }

  setDescription(description = "") {
    this.#description = description.trim();
    return this;
  }

  setDuration(hhmmss) {
    const [hours, minutes, seconds] = hhmmss.split(":").map(Number);

    if (isNaN(hours) || hours < 0) {
      throw new Error(`Invalid hours value: ${minutes} setting duration`);
    }
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      throw new Error(`Invalid minutes value: ${minutes} setting duration`);
    }
    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      throw new Error(`Invalid seconds value: ${seconds} setting duration`);
    }
    this.#duration = hours * 3600 + minutes * 60 + seconds;
    return this;
  }

  setDistance(km) {
    this.#distance = parseFloat(km) * 1000; // Convert km to meters
    return this;
  }

  setPace(mmss) {
    const [minutes, seconds] = mmss.split(":").map(Number);
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      throw new Error(`Invalid minutes value: ${minutes} setting pace`);
    }
    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      throw new Error(`Invalid seconds value: ${seconds} setting pace`);
    }

    this.#pace = minutes * 60 + seconds;
    return this;
  }

  setElevation(m) {
    if (isNaN(m) || m < 0) {
      throw new Error(`Invalid elevation value: ${m}`);
    }
    this.#elevation = parseInt(m);
    return this;
  }

  setCalories(kcal) {
    if (isNaN(kcal) || kcal < 0) {
      throw new Error(`Invalid calories value: ${kcal}`);
    }
    this.#calories = parseInt(kcal);
    return this;
  }

  setHeartRate(bpm) {
    if (isNaN(bpm) || bpm < 0) {
      throw new Error(`Invalid heart rate: ${bpm}`);
    }
    this.#heartRate = parseInt(bpm);
    return this;
  }

  setCadence(spm) {
    if (isNaN(spm) || spm < 0) {
      throw new Error(`Invalid Cadence: ${spm}`);
    }
    this.#cadence = parseInt(spm);
    return this;
  }

  build() {
    return new ActivityObject({
      when: this.#when.toISOString(),
      activityType: this.#activityType,
      title: this.#title,
      description: this.#description,
      duration: this.#duration,
      distance: this.#distance,
      pace: this.#pace,
      elevation: this.#elevation,
      calories: this.#calories,
      heartRate: this.#heartRate,
      cadence: this.#cadence,
    });
  }
}
