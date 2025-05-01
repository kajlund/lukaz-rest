export const logonSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      description: "Email address",
      example: "user@mail.com",
    },
    password: {
      type: "string",
      description: "Password",
    },
  },
};
