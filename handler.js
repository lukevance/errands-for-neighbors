'use strict';
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const SLACK_SHOP4SRS_PATH = require("./.env.json");

const getAction = require("./actions").getAction;

const base64Decoded = b64 => {
  const buff = Buffer.from(b64, 'base64');  
  const text = buff.toString('utf-8');
  return text;
};

const bodyMemory = encoded => {
  const urlEncoded = base64Decoded(encoded);
  // console.log(urlEncoded);
  const urlDecoded = decodeURI(urlEncoded);
  return urlDecoded;
  const mem = urlDecoded.split("Memory=")[1].split("}&")[0];
  return mem + "}";
}

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
  // if event.body is base64 encoded, decode it
  console.log(event.isBase64Encoded);
  const reqBody = event.isBase64Encoded ? bodyMemory(event.body) : event.body;
  console.log(reqBody);
  // if (!event.body || !event.body.Memory) return {statusCode: 400};
  // const ADDRESS = event.body.Memory.twilio.collected_data.order_info.answers.address;
  // const url = `https://hooks.slack.com/services/${SLACK_SHOP4SRS_PATH}`;
  // const options = {
  //     method: 'POST',
  //     body: {
  //       "text": `There is a new delivery request at Address: ${ADDRESS}`
  //     }
  // };
  // const res = await fetch(url, options);
  // const json = await res.json();
  // // TODO: store order info with user info for later updates
  // // respond with the order confirmation message
  // const actions = getAction("confirm_order");
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       actions: actions
  //     },
  //     null,
  //     2
  //   ),
  // };
};

module.exports = {actions, message};