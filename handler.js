'use strict';
const getAction = require('./actions');

module.exports.actions = async event => {
  if (!event.pathParameters || !event.pathParameters.action) return {statusCode: 400};
  const actions = getAction(event.pathParameters.action);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
      "actions": actions
      },
      null,
      2
    ),
  };
};