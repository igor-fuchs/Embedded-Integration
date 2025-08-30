require("dotenv").config({quiet: true});

const config = {
  OPCUA_ENDPOINT: process.env.OPCUA_ENDPOINT,
  OPCUA_NODE_ID: process.env.OPCUA_NODE_ID,
};

module.exports = { config };