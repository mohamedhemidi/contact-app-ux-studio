import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const params = {
    TableName: "ConctactsTable",
    Key: {
      ContactId: event.pathParameters.contactID,
    },
  };
  try {
    const res = await dynamoDB.get(params).promise();
    return formatJSONResponse(200, {
      contact: res,
    });
  } catch (error) {
    return formatJSONResponse(400, {
      error,
    });
  }
};

export const viewcontact = middyfy(handler);
