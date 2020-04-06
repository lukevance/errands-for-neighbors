'use strict';
const fetch = require("node-fetch");
const SLACK_SHOP4SRS_PATH = require("./.env.json");

const getAction = require("./actions").getAction;

const actions = async event => {
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

const message = async event => {
  if (!event.body || !event.body.Memory) return {statusCode: 400};
  const ADDRESS = event.body.Memory.twilio.collected_data.order_info.answers.address;
  const url = `https://hooks.slack.com/services/${SLACK_SHOP4SRS_PATH}`;
  const options = {
      method: 'POST',
      body: {
        "text": `There is a new delivery request at Address: ${ADDRESS}`
      }
  };
  const res = await fetch(url, options);
  const json = await res.json();
  // TODO: store order info with user info for later updates
  // respond with the order confirmation message
  const actions = getAction("confirm_order");
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        actions: actions
      },
      null,
      2
    ),
  };
};

module.exports = {actions, message};