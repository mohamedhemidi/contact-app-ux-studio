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
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      ALLOW_ORIGIN: "*",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:*",
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:eu-west-1:*:table/ConctactsTable",
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
      UXStudioImages: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'uxstudio',
          AccessControl: "PublicRead"
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
