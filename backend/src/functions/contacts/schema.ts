export default {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    picture: { type: "string" },
  },
  required: ["name", "email"],
} as const;
