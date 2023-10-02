import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const { email, name, phone, picture, archived } = event.body;
  const params = {
    TableName: "ConctactsTable",
    Key: {
      ContactId: event.pathParameters.contactID,
    },
    UpdateExpression:
      "set #n = :name, #e = :email,#p = :phone,#pi = :picture,#a= :archived",
    ExpressionAttributeNames: {
      "#n": "name",
      "#e": "email",
      "#p": "phone",
      "#pi": "picture",
      "#a": "archived",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
      ":phone": phone,
      ":picture": picture,
      ":archived": archived,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    await dynamoDB.update(params).promise();
    return formatJSONResponse(200, {
      message: "Contact updated successfully",
    });
  } catch (error) {
    return formatJSONResponse(400, {
      error,
    });
  }
};

export const updatecontact = middyfy(handler);
