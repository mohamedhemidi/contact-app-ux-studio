import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const contactsList = [
    {
      name: "Timothy Lewis",
      email: "timothy@lewis.com",
      phone: "+122334",
      active: true,
    },
  ];
  try {
    return formatJSONResponse(200, {
      contacts: contactsList,
    });
  } catch (error) {
    return formatJSONResponse(400, {
      error,
    });
  }
};

export const getcontacts = middyfy(handler);
