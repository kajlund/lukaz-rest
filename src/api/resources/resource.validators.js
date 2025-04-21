export const resourceSchema = {
  type: "object",
  required: ["name", "url"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
      description: "Name of the resource",
      example: "Google",
    },
    url: {
      type: "string",
      description: "URL for the resource",
      example: "https://www.google.com",
    },
    description: {
      type: "string",
      description: "Description of the resource",
      example: "A search engine.",
    },
    likes: {
      type: "number",
      minimum: 0,
      default: 0,
      description: "Number of likes for the resource",
      example: 100,
    },
    tags: {
      type: "array",
      items: {
        type: "string",
        minLength: 2,
        maxLength: 20,
      },
      description: "Tags associated with the resource",
      example: ["search", "engine"],
    },
  },
};
