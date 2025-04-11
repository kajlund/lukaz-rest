import Joi from "joi";

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("production", "development", "test").default("production"),
  PORT: Joi.number().positive().integer().default(3000),
  LOG_LEVEL: Joi.string().valid("trace", "debug", "info", "warn", "error", "fatal", "silent").default("info"),
  LOG_HTTP: Joi.number().integer().min(0).max(1).required().default(0),
  DB_CONNECTION: Joi.string().default(""),
}).unknown(); // Allow other unknown environment variables

/**
 *
 */
class Config {
  constructor(env, schema) {
    const { error, value: envVars } = schema.validate(env);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.isDev = envVars.NODE_ENV === "development";
    this.isProd = envVars.NODE_ENV === "production";
    this.isTest = envVars.NODE_ENV === "test";
    this.NODE_ENV = envVars.NODE_ENV;
    this.PORT = parseInt(envVars.PORT, 10);
    this.LOG_LEVEL = envVars.LOG_LEVEL;
    this.LOG_HTTP = parseInt(envVars.LOG_HTTP);
    this.DB_CONNECTION = envVars.DB_CONNECTION;
  }
}

const cnf = new Config(process.env, schema);

export default cnf;
