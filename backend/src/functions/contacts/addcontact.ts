import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB, S3 } from "aws-sdk";
import { v4 } from "uuid";
const dynamoDB = new DynamoDB.DocumentClient();

const bucketname = "uxstudio"
const s3subfolder = "profiles"

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const { email, name, phone, picture } = event.body;
  const id = v4();
  const params = {
    TableName: "ConctactsTable",
    Item: {
      ContactId: id,
      name,
      email,
      phone,
      picture,
      archived: false,
    },
  };
  try {
    await dynamoDB.put(params).promise();
    return formatJSONResponse(200, {
      message: "Contact created successfully",
    });
  } catch (error) {
    return formatJSONResponse(400, {
      error,
    });
  }
};

export const addcontact = middyfy(handler);
