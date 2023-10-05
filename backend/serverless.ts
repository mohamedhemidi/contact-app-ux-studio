import type { AWS } from "@serverless/typescript";

import {
  getcontacts,
  addcontact,
  viewcontact,
  updatecontact,
} from "@functions/contacts";

const serverlessConfiguration: AWS = {
  service: "uxstudio",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "local-dev",
    region: "eu-west-1",
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      ALLOW_ORIGIN: "*",
      CUSTOM_AWS_S3_BUCKET: "${ssm:/UX_STUDIO/AWS_S3_BUCKET}",
      CUSTOM_AWS_ACCESS_KEY: "${ssm:/UX_STUDIO/AWS_ACCESS_KEY}",
      CUSTOM_AWS_REGION: "eu-west-1",
      CUSTOM_AWS_SECRET_ACCESS_KEY: "${ssm:/UX_STUDIO/AWS_SECRET_ACCESS_KEY}",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:GetObject",
              "s3:PutObject",
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: [
              "arn:aws:dynamodb:eu-west-1:*:table/ConctactsTable",
              "arn:aws:s3:::${ssm:/UX_STUDIO/AWS_S3_BUCKET}/*",
            ],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ConctactsTable",
          AttributeDefinitions: [
            {
              AttributeName: "ContactId",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "ContactId",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  // import the function via paths
  functions: { getcontacts, addcontact, viewcontact, updatecontact },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
