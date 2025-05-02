export const addUserSchema = {
  type: "object",
  required: ["alias", "email", "password"],
  properties: {
    alias: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      description: "Alias of the user",
      example: "john_doe",
    },
    email: {
      type: "string",
      format: "email",
      description: "Email of the user",
      example: " ",
    },
    password: {
      type: "string",
      minLength: 8,
      description: "Password of the user",
      example: "password123",
    },
  },
};

export const updateUserSchema = {
  type: "object",
  required: ["alias"],
  additionalProperties: false,
  properties: {
    alias: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      description: "Alias of the user",
      example: "john_doe",
    },
  },
};
