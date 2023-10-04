import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB,S3 } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();

import { Buffer } from "buffer";
const s3 = new S3();
s3.config.update({
  accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY,
  secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY,
  region: process.env.CUSTOM_AWS_REGION,
});

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const { email, name, phone, picture, archived,base64 } = event.body;
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
    //
    // Handle Image:
    //

    if(base64) {

      await s3
      .deleteObject({ Bucket: `${process.env.CUSTOM_AWS_S3_BUCKET}/profile_images`, Key: `${name}.png` })
      .promise();

      
      const base64Image = base64;

      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const s3params: S3.PutObjectRequest = {
        Bucket: `${process.env.CUSTOM_AWS_S3_BUCKET}/profile_images`,
        Key: `${name}.png`,
        Body: buffer,
      };
      await s3.upload(s3params).promise();
    }

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
