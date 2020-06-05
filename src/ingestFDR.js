'use strict';

const AWS = require('aws-sdk');

const stepFunctions = new AWS.StepFunctions();

module.exports.handler = async event => {
  const params = {
    stateMachineArn: process.env.STATE_MACHINE,
    input: JSON.stringify(event)
  };

  try {
    await stepFunctions.startExecution(params).promise();
  } catch(err) {
    console.error(err);
  }
}