'use strict';

const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-central-1'});

const dbClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports.handler = async event => {
  const input = event.Records;
  const records = input || [];
  const ids = records.map(el => el.dynamodb.Keys.id.S);

  const outputError = event.error
  const errorType = outputError.Error

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuidv4(),
      dbIds: ids,
      input,
      errorType,
      outputError
    }
  };

  try {
    await dbClient.put(params).promise();
  } catch(err) {
    console.error(err);
  }
}