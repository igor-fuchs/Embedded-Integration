namespace OpcUa.Mapping;

public static class OpcConfig
{
    public static Uri OPCUA_ENDPOINT { get; } = new Uri("opc.tcp://192.168.1.20:4840");
    public static string WEBSOCKET_PREFIX { get; } = "http://localhost:5000/ws/";
}