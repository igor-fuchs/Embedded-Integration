const { OPCUAClient, AttributeIds, DataType } = require("node-opcua");

const OpcServerUrl = "opc.tcp://192.168.1.20:4840"; // OPC UA Server endpoint
const nodeIdToRead = 'ns=3;s="TIME-TESTING_DB"."Struct"."String"'; // Change to the NodeId you want to read/write

async function main() {
    const client = OPCUAClient.create({ endpointMustExist: false });
    await client.connect(OpcServerUrl);

    const session = await client.createSession();

    // Read value from server
    const dataValue = await session.read({
        nodeId: nodeIdToRead,
        attributeId: AttributeIds.Value
    });
    console.log("Value read from server:", dataValue.value.value);

    // Write value to server
    const valueToWrite = '42'; // Change to the desired value
    await session.write({
        nodeId: nodeIdToRead,
        attributeId: AttributeIds.Value,
        value: {
            value: {
                dataType: DataType.String,
                value: valueToWrite
            }
        }
    });
    console.log("Value written to server:", valueToWrite);

    await session.close();
    await client.disconnect();
}

main().catch(console.error);