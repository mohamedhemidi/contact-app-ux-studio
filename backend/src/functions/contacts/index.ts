import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";
import { origins } from "@libs/cors-origins";
export const getcontacts = {
  handler: `${handlerPath(__dirname)}/getcontacts.getcontacts`,
  events: [
    {
      http: {
        method: "get",
        path: "/getcontacts",
        cors: {
          origins,
        },
      },
    },
  ],
};
export const viewcontact = {
  handler: `${handlerPath(__dirname)}/viewcontact.viewcontact`,
  events: [
    {
      http: {
        method: "get",
        path: "/viewcontact/{contactID}",
        cors: {
          origins,
        },
      },
    },
  ],
};
export const addcontact = {
  handler: `${handlerPath(__dirname)}/addcontact.addcontact`,
  events: [
    {
      http: {
        method: "post",
        path: "/addcontact",
        cors: {
          origins,
        },
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
export const updatecontact = {
  handler: `${handlerPath(__dirname)}/updatecontact.updatecontact`,
  events: [
    {
      http: {
        method: "post",
        path: "/updatecontact/{contactID}",
        cors: {
          origins,
        },
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
