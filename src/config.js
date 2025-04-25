import ajv from "ajv";
const ajValidator = ajv({ allErrors: true, async: false });

const configSchema = {
  type: "object",
  required: ["NODE_ENV", "PORT", "LOG_LEVEL", "LOG_HTTP", "DB_CONNECTION"],
  additionalProperties: false,
  properties: {
    isDev: {
      type: "boolean",
      default: false,
      description: "Is the application running in development mode",
      example: false,
    },
    isTest: {
      type: "boolean",
      default: false,
      description: "Is the application running in test mode",
      example: false,
    },
    isProd: {
      type: "boolean",
      default: false,
      description: "Is the application running in production mode",
      example: false,
    },
    NODE_ENV: {
      type: "string",
      transform: ["trim"],
      enum: ["production", "development", "test"],
      default: "production",
      description: "Environment the application is running in",
      example: "development",
    },
    PORT: {
      type: "number",
      minimum: 80,
      maximum: 65535,
      default: 3000,
      description: "Port the server listens to",
      example: 3000,
    },
    LOG_LEVEL: {
      type: "string",
      enum: ["trace", "debug", "info", "warn", "error", "fatal", "silent"],
      default: "info",
      description: "Logging level for the application",
      example: "info",
    },
    LOG_HTTP: {
      type: "number",
      minimum: 0,
      maximum: 1,
      default: 0,
      description: "Enable HTTP logging",
      example: 1,
    },
    DB_CONNECTION: {
      type: "string",
      default: "",
      description: "Database connection string",
      example: "mongodb://localhost:27017/mydb",
    },
  },
};

const validate = ajValidator.compile(configSchema);

export function getConfig(env = process.env) {
  const cnf = {
    isDev: env.NODE_ENV === "development",
    isTest: env.NODE_ENV === "test",
    isProd: env.NODE_ENV === "production",
    NODE_ENV: env.NODE_ENV,
    PORT: parseInt(env.PORT),
    LOG_LEVEL: env.LOG_LEVEL,
    LOG_HTTP: parseInt(env.LOG_HTTP),
    DB_CONNECTION: env.DB_CONNECTION,
  };

  const result = validate(cnf);
  if (!result) {
    console.error("Config validation error", validate.errors);
    throw new Error("Config validation error");
  }
  return cnf;
}
