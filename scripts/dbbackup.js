import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import path from "node:path";

import { MongoClient } from "mongodb";
import pino from "pino";

const log = pino({
  level: process.env.LOG_LEVEL || "trace",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

const basePath = path.join(dirname(new URL(import.meta.url).pathname), "data");
log.info(`Output folder: ${basePath}`);

const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME);

async function backupCollection(name) {
  log.info(`Backing up ${name}...`);
  try {
    const data = [];
    const fileName = path.join(basePath, `${name}.json`);
    const coll = db.collection(name);
    const cursor = coll.find();
    for await (const doc of cursor) {
      data.push(doc);
    }
    writeFileSync(fileName, JSON.stringify(data, null, 2), { flags: "w" });
    log.info(`Backup of collection ${name} completed!`);
  } catch (err) {
    log.error(err, `Error backing up collection ${name}`);
  }
}

log.info(`Environment: ${process.env.NODE_ENV}`);
try {
  await backupCollection("users");
  await backupCollection("activities");
  await backupCollection("posts");
  await backupCollection("resources");
  log.info("Backup done!");
} catch (err) {
  log.error(err);
} finally {
  await client.close();
}
