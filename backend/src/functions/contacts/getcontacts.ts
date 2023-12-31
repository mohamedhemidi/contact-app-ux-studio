import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const params = {
    TableName: "ConctactsTable",
  };
  try {
    const res = await dynamoDB.scan(params).promise();

    const contactsList = res.Items.filter((item) => item["archived"] === false);
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
