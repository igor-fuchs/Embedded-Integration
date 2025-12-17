const { config } = require("../config");
const { OPCUAClient, AttributeIds, TimestampsToReturn, MonitoringMode, DataType } = require("node-opcua");

const opcUaServerUrl = config.OPCUA_ENDPOINT;
const nodeId = config.OPCUA_NODE_ID;

let session = null;

async function opcConnectionAndMonitoring(onValueChanged) {
  // Creating OPC UA client connection
  const client = OPCUAClient.create({ endpointMustExist: false });
  await client.connect(opcUaServerUrl);

  console.log("Connected to OPC UA Server");

  // Creating session and subscription preferences
  session = await client.createSession();

  const subscription = await session.createSubscription2({
    requestedPublishingInterval: 500,
    requestedLifetimeCount: 100,
    requestedMaxKeepAliveCount: 20,
    publishingEnabled: true,
    maxNotificationsPerPublish: 10,
    priority: 10
  });

  console.log("Session and subscription created");

  // Monitoring the specified node for changes
  const monitoredItem = await subscription.monitor(
    {
      nodeId: nodeId,
      attributeId: AttributeIds.Value
    },
    {
      samplingInterval: 500,
      discardOldest: true,
      queueSize: 10
    },
    TimestampsToReturn.Both,
    MonitoringMode.Reporting
  );

  console.log(`Monitoring node: ${nodeId}`);

  // Handling value changes
  monitoredItem.on("changed", (dataValue) => {
    const value = dataValue.value.value;
    console.log("New PLC value:", value);
    if (onValueChanged) onValueChanged(value);
  });
}

async function writeToOpcUa(value) {
  // Checks if session is established
  if (!session) return;

  // Writing value to the specified node
  await session.write({
    nodeId: nodeId,
    attributeId: AttributeIds.Value,
    value: {
      value: {
        dataType: DataType.String,
        value: value
      }
    }
  });
}

module.exports = {
  opcConnectionAndMonitoring,
  writeToOpcUa
};
