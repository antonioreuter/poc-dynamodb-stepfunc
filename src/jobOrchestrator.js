'use strict';

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

class THNotFoundError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "THNotFoundError";
    this.data = data;
  }
}

module.exports.handler = async event => {
  const records = event.Records || [];
  const ids = records.map(el => el.dynamodb.Keys.id.S);

  if (ids.includes('99999')) {
    throw new THNotFoundError('TH not found!', event);
  }

  if (ids.includes('88888')) {
    throw new CustomError('Custom error');
  }

  return event;
}