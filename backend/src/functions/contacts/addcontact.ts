import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { DynamoDB, S3 } from "aws-sdk";
import { v4 } from "uuid";
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
  const { email, name, phone, base64 } = event.body;
  const id = v4();
  const picture_slug = `${name.split(" ").join("_")}_${email}`;
  const params = {
    TableName: "ConctactsTable",
    Item: {
      ContactId: id,
      name,
      email,
      phone,
      picture: base64 ? picture_slug : "",
      archived: false,
    },
  };
  try {
    await dynamoDB.put(params).promise();
    // Handle Image:

    if (base64) {
      const base64Image = base64;

      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const s3params: S3.PutObjectRequest = {
        Bucket: `${process.env.CUSTOM_AWS_S3_BUCKET}/profile_images`,
        Key: `${picture_slug}.png`,
        Body: buffer,
      };
      await s3.upload(s3params).promise();
    }

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
