import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

export const getcontacts = {
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
export const viewcontact = {
  handler: `${handlerPath(__dirname)}/viewcontact.viewcontact`,
  events: [
    {
      http: {
        method: "get",
        path: "/viewcontact/{contactID}",
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
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
