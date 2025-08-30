const { opcConnectionAndMonitoring, writeToOpcUa } = require("./opc-ua-client");
const { broadcast, setupWebSocket } = require("./web-socket");

setupWebSocket((messageReceived) => {
  writeToOpcUa(messageReceived);
});

opcConnectionAndMonitoring((value) => {
  broadcast({ plcData: value });
});
