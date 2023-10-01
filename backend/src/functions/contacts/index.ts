import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/getcontacts.getcontacts`,
  events: [
    {
      http: {
        method: "get",
        path: "/getcontacts",
      },
    },
  ],
};
